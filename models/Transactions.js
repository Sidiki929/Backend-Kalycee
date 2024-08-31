const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema({

  id_client: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  amount: { type: Number, required: true },
  transfertType: {
    type: String,
    enum: ["envoi", "retrait"],
    required: true
  },
  transfertState: {
    type: String,
    enum: ["pending", "accepted","refused"],
    required: true
  },
  date_transaction: { type: Date, required: false },

});



const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports = Transactions;
