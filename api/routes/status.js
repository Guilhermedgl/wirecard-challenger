const express = require('express');
const Payment = require('../models/Payment');

const status = express.Router();

status.get('/', (req, res, next) => {
  Payment.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

status.get('/:id', (req, res, next) => {
  Payment.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json(response);
    });
});

module.exports = status;
