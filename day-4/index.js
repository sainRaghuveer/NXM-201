const express = require('express');
const {Server} = require("socket.io");
const http = require("http");

const app = express();


const httpServer = http.createServer(app)

app.get("/",(req, res)=>{
    res.send("This is homepage")
});

const io = new Server(httpServer);

httpServer.listen(8080, ()=>{
    console.log('listening on port 8080');
});

io.on("connection",(socket)=>{
    // socket.emit("print", "this is my message from server");
    // socket.on("abc",(msg)=>{
    //     console.log(msg);
    // });
    socket.on("print",(msg)=>{
        console.log(msg);
    })
})