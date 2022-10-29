const express = require('express');
const colors = require('colors');
const path = require('path');
const { createServer } = require('http');
const {} = require('socket.io');


// init express
const app = express();

// route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});


app.listen(5050, () => {
    console.log(`Server is Running on 5050`.bgCyan);
});