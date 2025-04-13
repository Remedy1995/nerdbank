const mongoose = require('mongoose');


const TransferSchema = new mongoose.Schema({
    receiverAccount: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    senderAccount : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferType : {
        type : String,
        required : true,
        enum : ["Credit","Debit","unknown"],
        default: "unknown"
        
    },
    descriptionOfTransfer: {
        type: String,
        required: true
    },
    transferStatus : {
     type :String,
     enum : ["pending","success"],
     default : "pending"
    },
    created_At: {
        type: Date,
        default: Date.now()
    }
},{ timestamps: true })

const Transfers = mongoose.model("Transfers", TransferSchema);

module.exports = Transfers;