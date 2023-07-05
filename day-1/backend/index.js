const express = require("express");
const cors = require("cors");
const fetch = (...args)=>
    import ("node-fetch").then(({default:fetch})=>fetch(...args))
require('dotenv').config();


const app= express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res)=>{
    res.send("welcome to the backend world!");
});

app.get("/getaccesstoken", (req, res)=>{
    //process.env.CLIENT_ID
    //process.env.CLIENT_SECRET
    const {code} = req.query
    fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,{
        method:"POST",
        Headers:{
            Accept:"application/json"
        }
    }).then((res)=>res.json())
    .then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.json({"error":error})
    })
});

app.get("/getuserdata",(req,res)=>{
    fetch(`https://api.github.com/user`,{
        method:"GET",
        headers:{
            "Authorization":req.get("Authorization")
        }
    }).then(response=>res.json())
    .then(data=>res.json(data))
    .catch(error=>console.log(error))
})


app.listen(process.env.PORT, ()=>{
    console.log(`App is running on port ${process.env.PORT}`);
})