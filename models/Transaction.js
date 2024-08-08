const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  description : {
    type: String,
    required : true
  },
  amount : {
    type : Number,
    required : true
  },
  type : {
    type : String,
    required : true,
    enum : ['income', 'expense']
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;