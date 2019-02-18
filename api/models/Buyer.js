/* eslint-disable prefer-destructuring */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  name: String,
  email: String,
  cpf: Number
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Buyer = mongoose.model('buyer', buyerSchema);

module.exports = Buyer;
