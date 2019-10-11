const express = require('express')

const app = express()

app.get('/test/dev', (req, res) => {
  res.send({
    code: 0,
    data: '你好',
    msg: '你好'
  })
})

app.get('/test', (req, res) => {
  res.send({
    code: 0,
    data: 'hello world',
    msg: 'hello world'
  })
})

app.listen(3000)
console.log('server is running at 3000')