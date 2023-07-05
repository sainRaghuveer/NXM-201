const {EventEmitter} = require("events");


const button = new EventEmitter();


button.on("click",()=>{
    console.log("Button has been clicked");
});


button.emit("click");

const player = new EventEmitter();

player.on("shot",(name)=>{
    console.log(`${name} has been shot`);
});

player.on("dead",(name)=>{
    console.log(`${name} has been killed`);
});

player.emit("dead","Mario");