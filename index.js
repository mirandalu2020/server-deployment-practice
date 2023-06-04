'use strict';

require('dotenv').config();
const app = require('./server');

const PORT=process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('App is listening!', PORT);
});