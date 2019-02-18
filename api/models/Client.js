/* eslint-disable prefer-destructuring */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  client: String
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;
