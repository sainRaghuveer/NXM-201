const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middleware/auth.middleware");
const {authorize}= require("./middleware/auth.middleware");
require('dotenv').config();

//created app using express
const app=express();

//parser
app.use(express.json());

//cross-origin-resource-sharing
app.use(cors());

//It is default route
app.get("/", (req, res)=>{
    res.send("Welcome to NXM backend..!");
});

//user route
app.use("/api/user", userRouter);

app.use(authenticate);


//port
const PORT = process.env.PORT || 8080


//server
app.listen(PORT , async()=>{
    try{
        await connection;
        console.log("connected with NXM DB")
    }catch(error){
        console.log(error);
    }
    console.log(`Server is running at port ${PORT}`);
})
