const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketIo(server)


io.on('connection', (socket) => {
    console.log('Cliente conectado')

    socket.on('message', (data) => {
        console.log(' Mensaje del cliente:', data)
        socket.emit('message', 'hola desde el servidor')

    })

    socket.on('disconnet', () => {
        console.log('Cliente desconectado')

    })
    
})

const PORT = 5050

server.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 5050')
})