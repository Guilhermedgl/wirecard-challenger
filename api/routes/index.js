/* eslint-disable no-underscore-dangle */

const express = require('express');
const Client = require('../models/Client');
const Buyer = require('../models/Buyer');
const Payment = require('../models/Payment');
const Card = require('../models/Card');

const router = express.Router();

const boleto = '0192834987 319319831 9 31839183918';

const checkEmptyInput = (req, res, next) => {
  const { client, name, email, cpf, amount, type, cardName, cardNumber, cardExp, cardCvv } = req.body;
  if (client === '' || name === '' || email === '' || cpf === '' || amount === '' || type === '' || cardName === '' || cardNumber === '' || cardExp === '' || cardCvv === '') {
    return res.status(401).json('invalid input');
  }
  next();
};

router.post('/', checkEmptyInput, (req, res, next) => {
  const { client, name, email, cpf, amount, type, cardName, cardNumber, cardExp, cardCvv } = req.body;
  const info = {};
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
        info.buyer = newBuyer._id;
        newBuyer.save();
      }
    })
    .catch((error) => {
      console.log(error);
    });

  if (type === 'Boleto' || type === 'boleto') {
    const newPayment = new Payment({ amount, type, buyer: info.buyer, client: info.client });
    newPayment.save();
    res.status(200).json(boleto);
  } else if (type === 'Credit Card' || type === 'credit card') {
    Card.findOne({ cardName, cardNumber, cardCvv })
      .then((response) => {
        if (response !== null) {
          info.card = response._id;
          const newPayment = new Payment({ amount, type, card: response._id, buyer: info.buyer, client: info.client, status: 'successful' });
          newPayment.save();
          res.status(200).json(newPayment.status);
        } else {
          const newCard = new Card({ cardName, cardNumber, cardExp, cardCvv });
          info.card = newCard;
          const newPayment = new Payment({ amount, type, card: newCard._id, buyer: info.buyer, client: info.client, status: 'denied' });
          newPayment.save();
          newCard.save();
          res.status(200).json(newPayment.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

module.exports = router;
