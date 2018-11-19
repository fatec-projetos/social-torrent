const express = require('express'),
      app = express(),
      consign = require('consign'),
      jwt   = require('jsonwebtoken'),
      uuid = require('uuid/v4');
      bodyParser = require('body-parser');
require("dotenv").load();

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('jwt', jwt);
app.set('signKey', uuid());

consign({cwd: 'src'})
    .include('mw')
    .then('routes')
    .then('dao')
    .then('db')
    .into(app);

app.listen(process.env.HTTP_PORT, function () {
    console.log('Serviço iniciado na porta ' + process.env.HTTP_PORT);
});
