const express = require('express');
const Redis= require("ioredis");
const { goldRouter } = require('./routes/gold.route');
const { connection } = require('./config/db');

const app = express();
app.use(express.json());

app.use("/",goldRouter)

app.listen(8800, async()=>{
    try {
        await connection
        console.log("connected with DB");
    } catch (error) {
        console.log("error");
    }
    console.log('listening on port 8080');
});