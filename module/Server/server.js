import http from 'http'
import fs from 'fs'


const PORT=4000


const Server=http.createServer((req,res)=>{
    
    if(req.url==='/'){
     res.writeHead(200,{'Content-Type':'text/html'});
     const data=fs.readFileSync('module/Server/index.html','utf-8')
res.end(data);
    }
    else if(req.url==='/about'){
res.writeHead(200,{'Content-Type':'text/plain'});
res.end('About-Page');

    }
    else if(req.url==='/contact'){
res.writeHead(200,{'Content-Type':'text/plain'});
res.end('Contact-Page');
    }
    else{
        res.writeHead(404,{'Content-Type':'text/plain'});
res.end('404 Page Not Found');
    }
});

Server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})