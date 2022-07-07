const {writeFile} = require('fs');
const net=require('net');
const PORT=110

let logs="";


const server=net.createServer((socket)=>{

    console.log("pop3 connection!!!!")
    const hellomes=`+OK pop3 ready ${socket.address().address}\n`
    socket.write(hellomes)
    logs+='S:'+hellomes+'\n'

    socket.on('data',(data)=>{
    
        console.log(`pop3 recived ${data} `) 
        logs+='C:'+data+'\n'

        let ret;
            if(data.includes("CAPA")){ 
                //ret=`+OK Capability list follows\nUSER\nRESP-CODES\nEXPIRE 0\nLOGIN-DELAY 300\nTOP\nUIDL\nX-GOOGLE-RICO\nSASL PLAIN XOAUTH2 OAUTHBEARER\n.\n`
                ret=`+OK Capability list follows\nUSER\nUIDL\n.\n`
            }
            

            if(data.includes("USER")){
                const username=data.toString().substring(data.lastIndexOf(' '),data.toString().length)
                
                ret=`+OK User accepted\n` 
            }

            if(data.includes("PASS")){
                const password=data.toString().substring(data.lastIndexOf(' '),data.toString().length)
                
                ret=`+OK Pass accepted\n` 
            }

            if(data.includes("STAT")){
                ret="+OK 2 320\n" 
            }

            if(data.includes("LIST")){
                ret="+OK 2 messages (320 octets)\n1 120\n2 200\n.\n"
            }
            
            if(data.includes("UIDL")){
                ret=`+OK Unique-IDs follow...\n1 69\n2 43\n.\n`
            }
            if(data.includes("RETR")){
                const mailnumber=data.toString().substring(data.lastIndexOf(' '),data.toString().length)
                ret=`+OK Message text follows...\nFrom: nigger@localhost\nTo: nigger@localhost\nSubject: wellcome\n\n BAKA PRASE JE NAJCI GASER NA SVETU I DOBRO JE STO SE K1KA UBILA \n.\n`
            }

            if(data.includes("DELE ")){
                const deletenumber=data.toString().substring(data.lastIndexOf(' '),data.toString().length)
                ret=`+OK message deleted\n`
            }

            if(data.includes("QUIT")){
                const bye='+OK Bye\n'
                socket.write(bye)
                logs+='S:'+bye+'\n'
            } 

            if(ret){
                socket.write(ret)
                logs+='S:'+ret+'\n'
            }else{
                ret="-ERR bad command\n"
                socket.write(ret)
                logs+='S:'+ret+'\n'
            }


            

    })

    socket.on('close',()=>{
        console.log("pop3 connection terminated")
        writeFile('./pop3logs.txt',logs,()=>{})

    })

})

server.listen(PORT,()=>{

    console.log(`pop3 server started on port ${PORT}`)

})