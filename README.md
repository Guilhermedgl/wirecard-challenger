# Wirecard challenge

## Guide
- Npm install - Install the dependencies in the local node_modules folder.
- Create a dotenv file in the root and assign PORT=3000 or any of your preference.
- Npm run dev - to start the server.
- Database name is wirecard-api.
- Open Postman to use the api.
## Postman
You can find a postman's documentation wirecard/Wirecard-api.postman_collection.json.
but here's a short guidance:
- POST - http://localhost:3000/
  you send the client, buyer, payment and card information to api.
- GET - http://localhost:3000/status
  the api response to you all the payments
- GET - http://localhost:3000/status/:id
 The api response with the specific payment id on params.

- BODY - FORM-URLENCODED
- The keys are:
  - client
  - name
  - email
  - cpf
  - amount
  - type (Boleto or Credit Card)
  - cardName
  - cardNumber
  - cardExp
  - cardCvv

## Stack
Node.JS, Express.JS and MongoDB.
