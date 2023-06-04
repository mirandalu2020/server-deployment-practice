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
    let upperMessage = capitalize(request.query.message);
    response.send(upperMessage);
  } else {
    response.send('Please attach a message');
  }
});

app.get('/state', async function(request, response, next) {
  let currentState = await getState();
  console.log(currentState)
  response.send(currentState);
});

app.post('/state', async function(request, response, next) {
  let updated = await updateState('off')
  if (request.query.state){
    updated = await updateState(request.query.state)
  }
  response.send(updated);
});

module.exports = app;