import http from 'http'
import fs from 'fs'

const server=http.createServer((req,res)=>{
    const date= new Date();
     const log = `Server Started at: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    res.writeHead(200,{"Content-Type":"text/plain"});
    fs.appendFileSync("information.txt",log)
 
    res.end("Hey,Welcome to NODE JS buddy!");
})

server.listen(3000,()=>{
    console.log("Server Started Successfulyy!!");
})
