const express = require('express');
const colors = require('colors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');


// init express
const app = express();


// create express server to row server
const httpServer = createServer(app);

// row server to socket server
const io = new Server(httpServer);

// create connection with client
io.on('connection', (socket) => {
    console.log(`Client Connected Successfully`.bgMagenta.black);
});


// route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});


httpServer.listen(5050, () => {
    console.log(`Server is Running on 5050`.bgCyan);
});