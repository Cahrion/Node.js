const http  = require("http");
const fs    = require("fs");
const server = http.createServer((req,res)=>{
  
    fs.readFile("Olusumlar/index.html", function(error, file){
        if(error){
            res.setHeader('Content-type', 'text/plain');
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
            res.end("Dosya bulunamadi.");
        }else{
            res.setHeader('Content-type', 'text/html');
            res.statusCode = 200;
            res.statusMessage = 'OKEY';
            res.end(file);
        }
    });

});

server.listen(3000);
console.log("Listening port on 3000....");