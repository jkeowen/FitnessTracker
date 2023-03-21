//const { client } = require('./db');
const express = require('express');
const server = express();
const apiRouter = require('./server/server');

server.use('/api', apiRouter);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
 // client.connect();
  console.log(`listening on port ${PORT}`);
});