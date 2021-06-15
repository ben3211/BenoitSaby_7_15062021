const http = require('http');
const exrpress = require('express');
const app = require ('./app');
require ('dotenv').config({path:'./config/.env'});

// Make sure the port provided is number or string
const normalizePort = val => {
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     return val;
   }
   if (port >= 0) {
     return port;
   }
   return false;
 };
 const port = normalizePort(process.env.PORT || '3000'); // Default port for the sending request 
 app.set('port', port);

 // characterize errors 
const errorHandler = error => {
   if (error.syscall !== 'listen') {
     throw error;
   }
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges.');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use.');
       process.exit(1);
       break;
     default:
       throw error;
   }
 };

// node server will return express application.  
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// port event listener
server.listen(port);
 