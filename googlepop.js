const port = 995;
const hostname = 'pop.gmail.com';
const tls = require('tls');
var fs = require('fs');

const options = {
    host: hostname,
    port: port,
    rejectUnauthorized: false
   };

   const socket = tls.connect(options, () => {
    console.log('client connected',socket.authorized ? 'authorized' : 'unauthorized');
   })
 
 
 socket.setEncoding('utf8')
  
 /*
  socket.write(`CAPA\n`)
  socket.write(`USER mrose\n`)

  */
   socket.write('UIDL\n')
  
 socket.on('data', (data) => {
    console.log(`S:${data}`)
    
    //socket.write(`CAPA\n`)
})