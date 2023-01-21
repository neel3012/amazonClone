const functions = require("firebase-functions");
const express=require('express');
const cors=require('cors');
const stripe=require('stripe')('sk_test_51JKIuISJ5ImtxTyVjnFRCgdsDsr0D5SgMtPRSzhEP6lB27KZOMLpyPlTsaQgPQkRtRaCcXDnGIwCO3HfakclJw3z00QqAlA7Gf');
const axios =require( 'axios');
//api

//app config
const app=express();


//middleware
app.use(cors({origin:true}));
app.use(express.json());


//api routes
app.get('/',(req,res)=>{
       res.status(200).send('hello world')
})
app.post('/payments/create',async (req,res)=>{
       const total=req.query.total;
       console.log('payment requst recieve',total);
       const paymentIntent=await stripe.paymentIntents.create({
              amount:total,
              currency:'inr'
       })
       res.status(201).send({
              clientsecret:paymentIntent.client_secret,
       });
      
})


//listen command
exports.api=functions.https.onRequest(app);

//http://localhost:5001/challenge-44489/us-central1/api