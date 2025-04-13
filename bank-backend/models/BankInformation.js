const mongoose = require('mongoose');

const BankDetailSchema = new mongoose.Schema({
    typeOfBank : {
        type: String,
        required: true
    },
    bankCountry: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    swiftCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, default: Date.now()
    }
},{ timestamps: true })

const BankSchema = new mongoose.Schema({
    bankinformation: [BankDetailSchema],
     user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
       // required: true
    }
},{ timestamps: true })

const Bank = mongoose.model("Bank",BankSchema);

module.exports = Bank ;