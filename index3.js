const WebSocket = require('ws');

// Crear el servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 5050 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Escuchar mensajes del cliente
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        // Aquí puedes procesar el mensaje recibido
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    // Enviar un mensaje al cliente cuando se conecta
    ws.send('Conexión establecida con el servidor WebSocket');
});

console.log('Servidor WebSocket escuchando en el puerto 5050');