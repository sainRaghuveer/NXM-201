const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
// require("winston-mongodb");

const app = express();

app.use(expressWinston.logger({
    transports:[
        new winston.transports.Console({
            json: true,
            colorize: true,
            level:"info",
        }),
        new winston.transports.File({
            level:"info",
            filename:"infologs.log"
        })
    ],
    format:winston.format.prettyPrint()
}));

app.get("/", (req, res) => {
    res.send("Home page...!");
});

app.get("/results", (req, res) => {
    res.send("Results");
});

app.get("/reports", (req, res) => {
    const {token} = req.query.token;
    if(token!==123){
        res.send("Invalid token");
    }else{
        res.send("Home page...!");
    }
});

app.listen(8000, ()=>{
    console.log("Running the server at port 8000...");
});

