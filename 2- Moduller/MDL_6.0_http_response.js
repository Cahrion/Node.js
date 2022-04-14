const http  = require("http");
const server = http.createServer((req,res)=>{
   
    // res.setHeader('Content-type', 'text/plain');
    // res.setHeader('Content-type', 'application/json');
    res.setHeader('Content-type', 'text/html');
    res.statusCode = 200;
    res.statusMessage = 'OKEY';

    res.write("<html>");
    res.write("<head><title>Node JS</title></head>");
    res.write("<body><h1>Hello from Node.JS Server</h1></body>");
    res.write("</html>");
    res.end();

});

server.listen(3000);
console.log("Listening port on 3000....");