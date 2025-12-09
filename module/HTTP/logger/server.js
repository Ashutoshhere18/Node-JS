import http from 'http'
import fs from 'fs'
const PORT=5000;
const server =http.createServer((req,res)=>{
   
 const formattedDate = new Date().toLocaleString('en-GB', { hour12: false }).replace(',', '   ');

 fs.appendFileSync('log_details.txt',`Server started at ${req.url} by ${req.method} method on ${formattedDate}\n`)

if(req.url==='/' && req.method==="GET"){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("Home Page : GET Request Received");
}
else if(req.url==='/' && req.method==="POST"){
 res.writeHead(200,{'Content-Type':'text/plain'});
 res.end("Home Page : POST Request Received");
}
else if(req.url==='/' && req.method==="PUT"){
 res.writeHead(200,{'Content-Type':'text/plain'});
 res.end("Home Page : PUT Request Received");
}
else if(req.url==='/' && req.method==="DELETE"){
 res.writeHead(200,{'Content-Type':'text/plain'});
 res.end("Home Page : DELETE Request Received");
}
})

server.listen(PORT,()=>{
    console.log("Server Started !!");
})






// 
// Server started at ${req.url} by ${req.method} method on