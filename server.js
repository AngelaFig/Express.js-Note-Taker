const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/index')

const PORT = 3001;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('api', api);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
});