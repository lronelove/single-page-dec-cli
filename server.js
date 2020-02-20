/*
 * @Descripttion: 
 * @Author: lronelove
 * @Date: 2020-01-09 10:57:36
 * @email: 657828543@qq.com
 */
const express = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  path: '/socket-login'
})

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

// 资源配置
const resources = {
  qrCode: 'https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb571dc8c5133d3d539b600bc12?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg'
}

// socket 链接
io.on('connection', (socket) => {
  console.log('链接上了')

  socket.on('joinLogin', (userId) => { // 订阅消息提醒，redis存储
    let socketUser = io.sockets.connected[socket.id]
    console.log('socketId', socket.id)
    socketUser.emit('hasBeenScanned', formatAjaxData('已经扫描了'))

    // socketUser.emit('confirmLogin', formatAjaxData('确认登陆'))

    // socketUser.emit('cancelLogin', formatAjaxData('取消登陆'))
  })
})

// 规范ajax数据格式
function formatAjaxData () {
  let data = {
    socketId: 'socketId',
    status: '2',
    uuid: '55'
  }

  return data
}

http.listen(3000)
console.log('server is running at 3000')
