'use strict';

// const credentials = {
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY
//   }
// };

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client();

async function getState (){
  const input = { 
    // Bucket: 'weather-data-capybara', 
    // Key: 'weather.json' 
    Bucket: 'pi-state', 
    Key: 'state.json' 
  
  };
  const response = await client.send(new GetObjectCommand(input));
  let stateData = await response.Body.transformToString();
  stateData = JSON.parse(stateData)
  
  console.log('Current RPi state' + JSON.stringify(stateData));
  return stateData;
}

module.exports = getState;