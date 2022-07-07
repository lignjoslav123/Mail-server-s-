const net=require('net')
const fs=require('fs')
const PORT=25
const typeServer='SMTP'
const domane_of_this_server="localhost"
let logs=""


/*
smtp error

502 


pop3 

-ERR
*/

const server=net.createServer((socket)=>{

    console.log(`SMTP connection!!!!`)
    socket.write(`220 ${domane_of_this_server}\n`)

    socket.on('data',(data)=>{
    
        console.log(`SMTP recived ${data}`) 
        logs+="C:"+data+'\n'
        let ret

        if(data.includes("HELLO")|| data.includes("EHLO")){
            const ip=data.toString().substring(data.lastIndexOf(' '),data.toString().length)
            ret=`250 Hello\n\r`
        }

        if(data.includes("MAIL FROM")){
            const sender=data.toString().substring(data.toString().indexOf('<')+1,data.toString().indexOf('>'))
            console.log(`||  ${sender} sends MaIl ||`)
            //ret=`220\n\r\n`
            ret=`\r\n250 OK\n`
        }

        //note there can be multipolar recipients 
        if(data.includes('RCPT TO:')){
            const recipient=data.toString().substring(data.lastIndexOf(' '),data.toString().length)
            ret=`250 OK\n`
        }

        if(data.includes('DATA')){
            ret=`354 End data with <CR><LF>.<CR><LF>\n`
        }

        if(data.includes('From') && data.includes('To') && data.includes('Subject') && data.includes('.')){
            ret=`250 Ok\n`
        }

        if(data.includes('QUIT')){
            ret=`221 Bye\n`
        } 

        if(ret){
            socket.write(ret)
            logs+="S:"+ret+"\n"
        }else{
            //socket.write()
        }
    })

    socket.on('close',()=>{
        console.log(`${typeServer} connection terminated`)
        fs.writeFile('smtplogs.txt',logs,()=>{})
    })

})

server.listen(PORT,()=>{

    console.log(`${typeServer} server started on port ${PORT}`)

})