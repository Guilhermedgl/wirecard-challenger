/* eslint-disable no-underscore-dangle */

const express = require('express');
const Client = require('../models/Client');
const Buyer = require('../models/Buyer');
const Payment = require('../models/Payment');
const Card = require('../models/Card');

const router = express.Router();

const boleto = '0192834987 319319831 9 31839183918';
const info = {};

const checkEmptyInput = (req, res, next) => {
  const { client, name, email, cpf, amount, type, cardName, cardNumber, cardExp, cardCvv } = req.body;
  if (client === '' || name === '' || email === '' || cpf === '' || amount === '' || type === '' || cardName === '' || cardNumber === '' || cardExp === '' || cardCvv === '') {
    return res.status(401).json('invalid input');
  }
  next();
};

const checkPaymentType = (req, res, next) => {
  const { amount, type, cardName, cardNumber, cardExp, cardCvv } = req.body;
  if (type === 'Boleto' || type === 'boleto') {
    const newPayment = new Payment({ amount, type });
    newPayment.save();
    res.status(200).json(boleto);
  } else if (type === 'Credit Card' || type === 'credit card') {
    Card.findOne({ cardName, cardNumber, cardCvv })
      .then((response) => {
        if (response !== null) {
          info.card = response._id;
          const newPayment = new Payment({ amount, type, card: response._id, status: 'successful' });
          newPayment.save();
        } else {
          const newCard = new Card({ cardName, cardNumber, cardExp, cardCvv });
          info.card = newCard;
          const newPayment = new Payment({ amount, type, card: newCard._id, status: 'denied' });
          newPayment.save();
          newCard.save();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  next();
};

router.post('/', checkEmptyInput, checkPaymentType, (req, res, next) => {
  const { client, name, email, cpf } = req.body;
  Client.findOne({ client })
    .then((response) => {
      if (response !== null) {
        info.client = response._id;
      } else {
        const newClient = new Client({ client });
        info.client = newClient._id;
        newClient.save();
      }
    })
    .catch((error) => {
      console.log(error);
    });

  Buyer.findOne({ cpf })
    .then((response) => {
      if (response !== null) {
        info.buyer = response._id;
      } else {
        const newBuyer = new Buyer({ name, email, cpf });
        info.newBuyer = newBuyer._id;
        newBuyer.save();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).json('banana');
});

module.exports = router;
