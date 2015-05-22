"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const path       = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

const users = require('./Users')(router);

app.use('/', router);

app.use(express.static(__dirname + '/../app'));

const port = 4649;

app.listen(port);


