const express = require('express');
const colors = require('colors');


// init express
const app = express();




app.listen(5050, () => {
    console.log(`Server is Running on 5050`.bgCyan);
});