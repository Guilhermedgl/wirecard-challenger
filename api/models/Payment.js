/* eslint-disable prefer-destructuring */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  amount: Number,
  type: {
    type: String, enum: ['Credit Card', 'Boleto']
  },
  card: { type: Schema.Types.ObjectId, ref: 'card' },
  status: String,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;
