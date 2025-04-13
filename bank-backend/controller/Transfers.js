const Transfers = require("../models/Transfers");
const Account = require("../models/Accounts");
const mongoose = require("mongoose");
const Response = require("../init/Response");
// const VerifyPin = require("../helpers/verifyPin");

// Retrieve the sender Account using his or her sender user id
const RetrieveSenderAccount = async (userId) => {
  if (userId) {
    try {
      const senderAccountId = await Account.findOne({
        accountName: userId,
      }).exec();
      console.log("my account information", senderAccountId);
      const { _id } = senderAccountId;
      return _id;
    } catch (error) {
      return null;
    }
  }

  return null;
};

const SenderAccountBalance = async (userId, amount = 0) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return 404;
  }

  if (userId) {
    try {
      const senderAccountId = await Account.findOne({
        accountName: userId,
      }).exec();
      console.log("account id sender", senderAccountId);
      if (senderAccountId) {
        const { accountBalance } = senderAccountId;

        if (accountBalance <= amount) {
          return 400;
        }
      }
    } catch (error) {
      console.log("my errror", error);
      return 500;
    }
  }

  return 200;
};

const checkReceiverAccountExists = async (receiverAccountNumber) => {
  let AccountId;
  if (!receiverAccountNumber) {
    return 404;
  }
  try {
    AccountId = await Account.findOne({
      accountNumber: receiverAccountNumber,
    }).exec();

    if (!AccountId) {
      return 404;
    }
  } catch (error) {
    return 500;
  }

  //If receiver Account exists save the receiver Account Id
  return AccountId._id;
};

//in making transfer the senderAccount is the userId and te receiverAccount is the account number of the receiver
exports.createTransfer = async (req, res, next) => {
  console.log("hello here", req.body);
  //retrieve senderAccount using userId
  const senderAccount =
    (await RetrieveSenderAccount(req.userId)) || req.body.senderAccount;
  const receiverAccount = req.body.receiverAccount;
  const amount = req.body.amount;
  const descriptionOfTransfer = req.body.descriptionOfTransfer;
  const transferType = req.body.transferType;


  //check if receiver account exists
  const checkReceiverAccount =
    await checkReceiverAccountExists(receiverAccount);
  //retrieve senders account balance
  const checkSenderAccountBalance = await SenderAccountBalance(
    senderAccount,
    amount
  );

  const accountResponse = {
    404: "Account Not found",
    400: "Sorry Insufficient Funds",
    500: "Sorry An Error Occured",
  };

  

  //cast account response into data type number
  const accountResponses = Object.keys(accountResponse).map((val) =>
    Number(val)
  );

  // check if receiver account exists
  if (accountResponses.includes(checkReceiverAccount)) {
    return res.status(checkReceiverAccount).json({
      message:
        checkReceiverAccount === 404
          ? "Receiver " + accountResponse[checkReceiverAccount]
          : accountResponse[checkReceiverAccount],
    });
  }

  //check if sender has sufficient funds to send
  if (accountResponses.includes(checkSenderAccountBalance)) {
    return res
      .status(checkSenderAccountBalance)
      .json({ message: accountResponse[checkSenderAccountBalance] });
  }
  try {
    //record this transfer transaction for the sender who is sending the funds
    const receiverAccountId = await checkReceiverAccountExists(receiverAccount);
    const senderTransfer = new Transfers({
      receiverAccount: receiverAccountId,
      senderAccount: senderAccount,
      amount: amount,
      descriptionOfTransfer: descriptionOfTransfer,
      transferType: transferType,
    });
    const saveSenderTransfer = await senderTransfer.save();

    //check if the accountStatus is active before you can fully process transfer to success state
    const checkAuthorisedAccount = await Account.findOne({
      _id : senderAccount,
    }).exec();

    if (checkAuthorisedAccount === null) {
      return res.status(403).json({
        message: `Sorry the sender Account id provided does not exist`,
      });
    }
    console.log("my authorised", checkAuthorisedAccount);
    const { accountStatus } = checkAuthorisedAccount;

    if (
      ["inactive", "suspended"].includes(accountStatus) &&
      saveSenderTransfer
    ) {
      return res.status(403).json({
        message: `Sorry Account has been ${accountStatus} and cannot make transfer please contact support for assistance`,
      });
    }

    // To complete transfer and protect account funds let verify the pin of the user whether it is correct
    // const verifyPinResponse = await VerifyPin(userPin, req.userId);
    // const pinStatusCodes = Object.keys(PinResponse).map((val) => Number(val));
    // if (pinStatusCodes.includes(verifyPinResponse)) {
    //   return res
    //     .status(verifyPinResponse)
    //     .json({ message: PinResponse[verifyPinResponse] });
    // }

    // If the account is active update the transfer status and process transfer successfully
    const updateTransfers = await Transfers.findOneAndUpdate(
      { _id: saveSenderTransfer._id }, // Find transfer by ID
      { transferStatus: "pending" }, // Update transfer Status
      { new: true } // Return the updated document
    );

    //update the sender's account balance by debiting the sender's account
    const searchSenderAccount = await Account.findOne({
      _id : senderAccount,
    }).exec();
    const senderCurrentBalance = Number(searchSenderAccount.accountBalance);
    const senderAccumulatedBalance = senderCurrentBalance - Number(amount);
    if (searchSenderAccount) {
      //update Sender Account's
      const updateAccountBalance = await Account.findOneAndUpdate(
        { _id : senderAccount }, // Find transfer by ID
        { accountBalance: senderAccumulatedBalance }, // Update description
        { new: true } // Return the updated document
      );

      //update the transferType of the sender's Transfer History to Debit
      const updateTransferInformation = await Transfers.findOneAndUpdate(
        { _id: saveSenderTransfer._id }, // Find transfer by ID
        { transferType: "Debit" }, // Update description
        { new: true } // Return the updated document
      );
    }

    //update the receivers's account balance by crediting the reciever's account
    const searchReceiverAccount = await Account.findOne({
      accountNumber: receiverAccount,
    }).exec();
    console.log("search", searchReceiverAccount);
    const receiverCurrentBalance = Number(searchReceiverAccount.accountBalance);
    const receiverAccumulatedBalance = receiverCurrentBalance + Number(amount);
    if (searchReceiverAccount) {
      //update Receiver's Account's
      const updateAccountBalance = await Account.findOneAndUpdate(
        { accountNumber: receiverAccount }, // Find transfer by ID
        { accountBalance: receiverAccumulatedBalance }, // Update description
        { new: true } // Return the updated document
      );

      //record transaction for the reciever
      const receiverTransfer = new Transfers({
        receiverAccount: searchReceiverAccount._id,
        senderAccount: senderAccount,
        amount: amount,
        descriptionOfTransfer: "Transfer funds of " + amount,
        transferType: "Credit",
        transferStatus: "success",
      });

      const saveReceiverTransfer = await receiverTransfer.save();
      console.log("reeeecc", saveReceiverTransfer);
    }

    res.status(201).json({
      message: `Transfer has been initiated successfully and currently in progress the bank will notify you once the transfer is completed`,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Sorry Server Error Try Again Later" });
  }
};

exports.allTransfers = async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = parseInt(req.query.page) || 1;
  try {
    const transfers = await Transfers.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ created_At: -1 });
    console.log("transfers", transfers);
    const allDocuments = await Transfers.countDocuments();

    const totalpages = Math.ceil(allDocuments / perPage);
    const documentsPerPage = allDocuments > 0 ? perPage : 0;
    const currentPage = allDocuments > 0 ? page : 0;
    const allData = {
      transfers,
      totalpages,
      documentsPerPage,
      allDocuments,
      currentPage,
    };

    return res.status(200).json(allData);
  } catch (error) {
    console.log("err", error);
    return res
      .status(500)
      .json({ message: "Sorry an error occured Please try later" });
  }
};

exports.allUserTransfers = async (req, res) => {
  let userId = req.userId;
  // userId = '67a861fdc79408b16c18a1bc';
  const senderAccount = await RetrieveSenderAccount(userId);
  try {
    const accountInfo = await Transfers.find({ senderAccount: senderAccount })
      .populate({
        path: "receiverAccount",
        populate: { path: "accountName" }, // Nested populate for User data
      })
      .populate({
        path: "senderAccount",
        populate: { path: "accountName" }, // Nested populate for User data
      })
      .exec();
    var newSuccess = new Response(200, accountInfo, "Success");
    return res.status(200).json(newSuccess.successObject());
  } catch (error) {
    let newError = new Response(500, "Internal Server Error", error.message);
    return res.status(500).json(newError.errorObject());
  }
};
