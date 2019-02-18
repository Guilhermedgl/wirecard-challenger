/* eslint-disable prefer-destructuring */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  cardName: String,
  cardNumber: Number,
  cardExp: Number,
  cardCvv: Number
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;
