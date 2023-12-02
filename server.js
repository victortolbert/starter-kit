const process = require('node:process')
const express = require('express')
const auth = require('http-auth')

const app = express()
const port = process.env.PORT || 3000

const basic = auth.basic({
  realm: 'Starter Kit',
}, (username, password, callback) => {
  callback(username === process.env.USERNAME && password === process.env.PASSWORD)
})

// Use the basic auth middleware directly
if (process.env.USERNAME && process.env.PASSWORD) {
  app.use((req, res, next) => {
    basic.check(req, res, next)
  })
}

app.use('/', express.static('./dist'))

app.listen(port, () => {
  console.log(`Listening on port ${port}!\n\nDeveloping locally? Run "npm run dev" instead.`)
})
