const express = require('express');
const router = express.Router();
const { order_histories }=require('../models');



    router.get("/",async(req,res)=>{
        const orderhistories =await order_histories.findAll(); 
        res.json(orderhistories);
    });
    
    router.post("/",async(req,res)=>{
        const orderhistories = req.body;  
        await order_histories.create(orderhistories);
        res.json(orderhistories);
    
        }) ;

  
module.exports =router;