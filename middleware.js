const express = require('express');
const port=3001;
const app = express();

app.get("/home",(req,res)=>{
    res.send("This is home page")
})

app.listen(port,(req,res)=>{
    console.log(`Middle ware started running on ${port}`);
})