require('dotenv').config();
const serverless = require('serverless-http'); 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const PUERTO = 4300;
const app = express();

app.set('port', process.env.PORT || PUERTO);

app.get('/', inicio);

app.get('/grafico/:ticker', (req, res) => {
    res.sendFile(__dirname + "/public/grafico.html");
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static("public"));

function inicio (peticion, resultado)
{
   resultado.sendFile(__dirname + "/public/index.html");
}

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require('./routes'));
app.use('/graficos/', require('./routes/graficos'));

module.exports.handler = serverless(app);