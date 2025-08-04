const express = require('express');
const port=3000;

const app =express();

app.use(express.json());
app.get("/",(req,res)=>{
    console.log(req);
    res.send("Hello world");
})
app.get("/about",(req,res)=>{
    console.log(req);
    res.send("About page");
})
app.get("/Home",(req,res)=>{
    res.send("Welcome to the home page ");
})

app.post("/addNewUser",(req,res)=>{
    console.log(req.body);
    
    const {username,age} = req?.body;
    if(!username|| !age){
        return res.status(400).json({message:"username and age are required"})
    }
})
app.listen(port,()=>{
    console.log(`server is running on the local host ${port}`);
})