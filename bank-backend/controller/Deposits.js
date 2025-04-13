const Deposits = require("../models/Deposits");
const Account = require("../models/Accounts");
const mongoose = require("mongoose");


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

//make deposits using the user id
exports.makeDeposits = async (req, res, next) => {
  console.log("deposit route");
  //retrieve senderAccount using userId

  const { receiverAccount } = req.body;
  console.log("Hello", receiverAccount[0]);
  try {
    const senderAccount =
      (await RetrieveSenderAccount(req.userId)) || req.body.senderAccount;
    const amount = req.body.amount;
    const descriptionOfTransfer = req.body.descriptionOfTransfer;
    const transferType = req.body.transferType;
    const userPin = req.body.userPin;

    //retrieve senders account balance
    const checkSenderAccountBalance = await SenderAccountBalance(
      req.userId,
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
    // check for amount type
    if (isNaN(Number(amount))) {
      return res.status(422).json({ message: "Invalid Amount Provided" });
    }
    //check if sender has sufficient funds to send
    if (accountResponses.includes(checkSenderAccountBalance)) {
      return res
        .status(checkSenderAccountBalance)
        .json({ message: accountResponse[checkSenderAccountBalance] });
    }

    //record this transfer transaction for the sender who is sending the funds
    console.log("my sender account", senderAccount);
    const senderTransfer = new Deposits({
      receiverAccount: receiverAccount[0],
      senderAccount: senderAccount,
      amount: amount,
      descriptionOfTransfer: descriptionOfTransfer,
      transferType: transferType,
    });
    const saveSenderTransfer = await senderTransfer.save();

    //check if the accountStatus is active before you can fully process transfer to success state
    const checkAuthorisedAccount = await Account.findOne({
      _id: senderAccount,
    }).exec();

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

   

    // If the account is active update the transfer status and process transfer successfully
    const updateDeposits = await Deposits.findOneAndUpdate(
      { _id: saveSenderTransfer._id }, // Find transfer by ID
      { transferStatus: "pending" }, // Update transfer Status
      { new: true } // Return the updated document
    );

    //update the sender's account balance by debiting the sender's account
    const searchSenderAccount = await Account.findOne({
      _id: senderAccount,
    }).exec();
    const senderCurrentBalance = Number(searchSenderAccount.accountBalance);
    const senderAccumulatedBalance = senderCurrentBalance - Number(amount);
    if (searchSenderAccount) {
      //update Sender Account's
      const updateAccountBalance = await Account.findOneAndUpdate(
        { _id: senderAccount }, // Find transfer by ID
        { accountBalance: senderAccumulatedBalance }, // Update description
        { new: true } // Return the updated document
      );

      //update the transferType of the sender's Transfer History to Debit
      const updateTransferInformation = await Deposits.findOneAndUpdate(
        { _id: saveSenderTransfer._id }, // Find transfer by ID
        { transferType: "Debit" }, // Update description
        { new: true } // Return the updated document
      );
    }

    return res.status(201).json({
      message: `Transfer has been initiated successfully and currently in progress the bank will notify you once the transfer is completed`,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Sorry Server Error Try Again Later" });
  }
};

exports.allDeposits = async (req, res) => {
  const perPage = parseInt(req.query.perPage) || 10;
  const page = parseInt(req.query.page) || 1;
  try {
    const deposits = await Deposits.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ created_At: -1 });
    const allDocuments = await Deposits.countDocuments();

    const totalpages = Math.ceil(allDocuments / perPage);
    const documentsPerPage = allDocuments > 0 ? perPage : 0;
    const currentPage = allDocuments > 0 ? page : 0;
    const allData = {
      deposits,
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

exports.allUserDeposits = async (req, res) => {
  try {
    let userId = req.userId;

    //userId = '67b66ac952894e07aff5360d'
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(422).json({ message: "User ID is required" });
    }

    // Convert userId to ObjectId if it's not already
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const senderAccount = await RetrieveSenderAccount(userObjectId);

    // Fetch deposits where the user is the sender
    const deposits = await Deposits.find({ senderAccount: senderAccount })
      .populate("senderAccount", "-password") // Populate sender account details
      .exec();

    if (!deposits.length) {
      return res.status(404).json({ message: "No deposit records found" });
    }

    return res.status(200).json({
      status: 200,
      data: deposits,
      message: "Success",
    });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
