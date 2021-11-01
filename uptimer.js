const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Bot uptimer!')
})
 
app.listen(3000)
