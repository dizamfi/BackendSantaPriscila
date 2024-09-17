const express = require('express')
const bodeyParser = require('body-parser')
const http = require('http')
const socketIo = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketIo(server)

app.use(bodeyParser.json())

let plcData = null

app.post('/data', (req, res) => {
    plcData = req.body.data
    console.log('Datos recibidos del cliente Modbus:', plcData)

    io.emit('plcData', plcData)

    res.status(200).send('Datos recibidos')
})

app.get('/data', (req, res) => {
    res.json({data: plcData})

})

io.on('connection', (socket) => {
    console.log('Cliente conectado')

    if(plcData) {
        socket.emit('plcData', plcData)
    }

    socket.on('disconnet', () => {
        console.log('Cliente desconectado')

    })
})

const PORT = 5050

server.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 5050')
})