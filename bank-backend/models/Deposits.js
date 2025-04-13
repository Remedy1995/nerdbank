const mongoose = require('mongoose');

const ReceiverAccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Savings", "Current", "Checking"],
    },
    accountBankName: {
        type: String,
        required: true,
    },
    accountBankSwiftCode: {
        type: String,
        required: true,
    },
    accountBankRoutingTransitNumber: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, default: Date.now()
    }
})

const DepositSchema = new mongoose.Schema({
    receiverAccount: [ReceiverAccountSchema],
    senderAccount: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferType: {
        type: String,
        required: true,
        enum: ["Debit","unknown"],
        default: "unknown"

    },
    descriptionOfTransfer: {
        type: String,
        required: true
    },
    transferStatus: {
        type: String,
        enum: ["pending", "success"],
        default: "pending"
    }
},{ timestamps: true })

const Deposit = mongoose.model("Deposits",DepositSchema);

module.exports = Deposit;