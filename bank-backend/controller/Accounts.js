

const Account = require('../models/Accounts')
const mongoose = require("mongoose");



const generateAccountNumber = (length = 10) => {
const numbers = '1234567890'
const val = Array.from({length : length },() => {
 const randomiseNumber = Math.floor(Math.random() * length);
 return numbers[randomiseNumber]
})
return val.join("");
}


exports.createAccount = async (req, res, next) => {
  const userId = req.body.userId;
  const accountType = req.body.accountType;
  const accountNumber = generateAccountNumber();
  const accountStatus = req.body.accountStatus;

  //check if the user Id passed is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {

    return res.status(422).json({
      message: 'Sorry the object userId is invalid'
    })
  }

 //check if user already has an existing account

  const checkAccount = await Account.findOne({ accountName : userId });
  console.log('my searched user',checkAccount)
//   if(checkAccount){
//     return res.status(422).json({
//        message: `Sorry Account Number has already been generated for user`
//      })
//   }
  try {
    let accounts = new Account({
      accountName: userId,
      accountType: accountType,
      accountNumber: accountNumber,
      accountStatus: accountStatus,

    })
    const createAccounts = await accounts.save();
    if (createAccounts) {
      res.status(201).json({
        message: `Account Number ${accountNumber} has been created for the user successfully`
      })
    }
    console.log('mine accounts', accounts)
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: 'Sorry an error occured please try again later' })
  }


}




exports.allAccounts = async (req, res) => {
  console.log("trying to fetch accounts")
  const perPage = parseInt(req.query.perPage) || 10;
  const page = parseInt(req.query.page) || 1;
  try {
    
    const accounts = await Account.find().skip((page - 1) * perPage).limit(perPage).sort({ "created_At": -1 }).populate("accountName", "-password");
    console.log("data has been fetched",accounts)
    const allDocuments = await Account.countDocuments();

    const totalpages = Math.ceil(allDocuments / perPage);
    const documentsPerPage = allDocuments > 0 ? perPage : 0;
    const currentPage = allDocuments > 0 ? page : 0;
    const allData = { accounts, totalpages, documentsPerPage, allDocuments, currentPage }

    return res.status(200).json(allData)

  }
  catch (error) {
    console.log('err in fetching', error.message)
    return res.status(500).json({ message: "Sorry an error occured Please try later" });
  }
}

exports.AccountInformation = async (req, res) => {
  try {
    let userId = req.userId;
    //userId = '67a86008da13d492758205cd'; // Hardcoded for debugging
    console.log('my userId', userId);

    if (!userId) {
      return res.status(422).json({ message: 'User account does not exist' });
    }

    const accountInfo = await Account.findOne({ accountName: userId })
      .populate("accountName", "-password")
      .exec();

    if (!accountInfo) {
      return res.status(404).json({ message: 'Account not found' });
    }

    return res.status(200).json({ status: 200, data: accountInfo, message: 'Success' });
  } catch (error) {
    console.error('Error fetching account info:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.UpdateAccounts = async (req, res) => {
  let { ...updateFields } = req.body;
  let accountId = updateFields.accountId;

   delete updateFields.accountId;
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(422).json({
      status: false,
      message: 'User ID is required'
    });
  }
try {
    const updatedAccount = await Account.updateOne(
      { _id : accountId }, // Find by accountName
      { $set: updateFields},
      { new: true, runValidators: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Account updated successfully",
      data: updatedAccount, // Changed from updatedUser to updatedAccount
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error updating account",
      error: error.message, // Uncommented for debugging
    });
  }

};





