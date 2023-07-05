const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 4500 });

wss.on('connection', (socket) => {
    console.log("A new connection has been established");
    socket.on("message",(msg)=>{
        console.log(""+msg);
    });
    socket.send("Hello!");
    socket.send("Ta Ta!");
});