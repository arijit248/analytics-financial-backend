const express = require('express')
const route = express.Router();
const analyticsController = require('./controller/analyticsControler')


route.post('/',analyticsController.customerList)
route.post('/details',analyticsController.customerDetails)
route.post('/transactiondetails',analyticsController.customerTransactionDetails)

module.exports = route