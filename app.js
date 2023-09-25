const express=require("express");


const path=require("path");
const app=express();
const mongoose = require('mongoose');

// it is middele ware
const bodyparser =require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port=8000;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:Number,
    email:String,
    address:String,
    desc:String
  });

  const Contact = mongoose.model('Contact', contactSchema);


// Express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug') //set the templet engine as pug
app.set('views' , path.join(__dirname,'views')) //set the view directory

app.get('/',(req,res)=>{
    const parms={ }
    res.status(200).render('home.pug',parms);
});
app.get('/contact',(req,res)=>{
    const parms={ }
    res.status(200).render('contact.pug',parms);
});

app.post('/contact',(req,res)=>{
   var myData = new Contact(req.body);
   myData.save().then(()=>{
    res.send("This item has been saved to the dataBase ");
   }).catch(()=>{
    //alert("item was not sent to data base");
    //confirm("data saved to datbase");
    res.status(400).send("item was not sent to data base");
   })
    // res.status(200).render('contact.pug');
});

// start the server
app.listen(port,()=>{
    console.log(`The appliction started succesfully on port 127.0.0.1:8000  or ${port}`);
});