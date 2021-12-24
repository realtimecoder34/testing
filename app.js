const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public',express.static('public'));

app.get('/',(req,res,next) => {
    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    console.log(ip);
    res.status(200).json({
        'ip':ip
    });
    //res.sendFile(path.join(__dirname, './public/index.html'));
})
module.exports = app;