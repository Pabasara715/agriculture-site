const express = require('express');
const router = express.Router();
const { vegetabledata }=require('../models');




const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'luzifer715',
  database: 'agriculture',
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  }
});




router.get("/",async(req,res)=>{
     const listvege =await vegetabledata.findAll(); 
     res.json(listvege);
}); 



router.get("/byVegeType/:vegetype", async (req, res) => {

     const vegetype = req.params.vegetype;
     const query = `SELECT * FROM vegetabledata WHERE vegetype = "${vegetype}"`;

  connection.query(query, [vegetype], (error, results) => {
     if (error) throw error;
     res.json(results);
  });
 });



router.post("/",async(req,res)=>{
 const vegetable = req.body;
 await vegetabledata.create(vegetable);
 res.json(vegetable);

}) ;



module.exports =router;