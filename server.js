const express = require('express');
const colors = require('colors');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
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

    // get all chat from db
    const latestChat = JSON.parse(readFileSync(path.join(__dirname, './db/chat.json')));
    // return to every client
    io.sockets.emit('latestChat', latestChat);

    // data send to client
    // socket.send('we love javaScript');

    // getting data form client & return to every client
     socket.on('chat', ({name, msg, photo}) => {
        // io.sockets.emit('newEvent', data);

        // get old chat
        const oldChat = JSON.parse(readFileSync(path.join(__dirname, './db/chat.json')));
        oldChat.push({name, msg, photo});
        writeFileSync(path.join(__dirname, './db/chat.json'), JSON.stringify(oldChat));
        // console.log(oldChat);

        // get all chat from db
        const latestChat = JSON.parse(readFileSync(path.join(__dirname, './db/chat.json')));
        // return to every client
        io.sockets.emit('latestChat', latestChat);

     });


    // if client disconnect
    // socket.on('disconnect', () => {
    //     console.log(`Client Disconnected`.bgRed.black);
    // });
});


// route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

// static folder
app.use(express.static(path.join(__dirname)));

// server listen
httpServer.listen(5050, () => {
    console.log(`Server is Running on 5050`.bgCyan);
});