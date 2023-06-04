'use strict';

const express = require('express');
const capitalize = require('./capitalize/capitilize');
const getState=require('./readS3/getState')
const {updateState}=require('./updateState/updateState')
const cors = require('cors');

const app = express(); // singleton

app.use(cors());


// what parameters are defined in express functions ??
app.get('/capitalize-me', function(request, response, next) {
  // I want to send a message as a query parameter??
  if (request.query.message) {
    // I want that message returned in the response as all caps.
    let upperMessage = capitalize(request.query.message);
    response.send(upperMessage);
  } else {
    response.send('Please attach a message');
  }
});

app.get('/state', function(request, response, next) {
  let currentState = getState();
  response.send(currentState);
});

app.post('/state', function(request, response, next) {
  let updated = updateState('off')
  response.send(updated);
});

module.exports = app;