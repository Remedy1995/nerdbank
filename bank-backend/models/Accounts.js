const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    accountName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    accountType: {
      type: String,
      required: true,
      enum: ["Savings", "Current", "Checking"],
      default: "Savings"
    },
    accountPin: {
      type: String,
      default: null
    },
    accountBankName: {
      type: String,
      required: true,
      default: "Nerd Bank"
    },
    accountBankSwiftCode: {
      type: String,
      required: true,
      default: "NDDDDDDDD"
    },
    accountBankRoutingTransitNumber: {
      type: String,
      required: true,
      default: "12333333"
    },
    accountNumber: {
      type: String,
      required: true
    },
    accountBalance: {
      type: Number,
      default: 0,
      get: (value) => parseFloat(value).toFixed(2) // Format to 2 decimal places
    },
    accountStatus: {
      type: String,
      required: true,
      enum: ["inactive", "active", "suspended"],
      default: "inactive"
    },

  },
  {
  toJSON: { getters: true },
  toObject: { getters: true } ,
  timestamps: true
  } // Apply formatting globally
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
