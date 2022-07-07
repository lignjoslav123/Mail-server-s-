const port = 465;
const hostname = 'smtp.yandex.com';
const tls = require('tls');
var fs = require('fs');
let logs=""
const options = {
  host: hostname,
  port: port
};


const socket = tls.connect(options, () => {
    console.log('client connected',socket.authorized ? 'authorized' : 'unauthorized');

    socket.write(`HELO ${hostname}.rs \nQUIT`)
    console.log(`C:HELO ${hostname} \nQUIT`)

    const t=()=>{
    socket.write(`MAIL FROM:<gas@pmf.edu.rs>\r\n`)
    console.log('C:MAIL FROM:<gas@pmf.edu.rs>')
    }

    setTimeout(t,10000)
  
  })

  socket.setEncoding('utf8')



  socket.on('data',(data)=>{
    console.log(`S:${data}`)
  })