const express = require('express')
const keys = require('../config/keys')
const router = express.Router()
const keys = require('./config/keys')

const stripe = require('stripe')(keys.stripePublishableKey)


router.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey
  })
})


router.post('/charge', (req, res) => {
  const amount = 2500
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Strong JavaScript',
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => res.render('success'))
})

module.exports = router