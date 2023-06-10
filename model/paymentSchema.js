const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  txnDate: {
    type: String,
    required: true,
  },
  txnTime: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
    required: true,
  },
});

const Payment = mongoose.model("PAYMENT", paymentSchema);
module.exports = Payment;
