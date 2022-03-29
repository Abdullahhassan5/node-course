const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;
const morgan = require('morgan');
const app = express();

var dishrouter = require('./routes/dishrouter')
var leaderRouter = require('./routes/leaderRouter')
var promoRouter = require('./routes/promoRouter')
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.json());
app.use('/dishes',dishrouter)
app.use('/leader',leaderRouter)
app.use('/promo', promoRouter)

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});