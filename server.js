const process = require('node:process')
const express = require('express')

const auth = require('http-auth')

const port = process.env.PORT || 3000

const basic = auth.basic({
  realm: 'Salesforce Lightning Design System Prototype',
}, (username, password, next) => {
  next(username === process.env.USERNAME && password === process.env.PASSWORD)
})

if (process.env.USERNAME && process.env.PASSWORD)
  app.use(auth.connect(basic))

app.use('/', express.static('./dist'))

app.listen(port, () =>
  console.log(`Listening on port ${port}!\n\nDeveloping locally? Run "npm run dev" instead.`))
