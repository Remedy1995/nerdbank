const mongoose = require("mongoose");

const CardDetailSchema = new mongoose.Schema(
  {
    card: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const CardSchema = new mongoose.Schema(
  {
    cardinformation: [CardDetailSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Cards = mongoose.model("Cards", CardSchema);

module.exports = Cards;
