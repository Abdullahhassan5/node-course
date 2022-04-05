const express = require('express');
const promoRouter = express.Router();
const Promos = require('../models/promoSchema')
const mongoose =require('mongoose');

console.log("we are in promotion router")
    promoRouter.get('/', (req,res,next)=>{
        Promos.find({})
        .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
    })



// get by id
promoRouter.get('/:id',(req, res)=>{
    res.end("we will send  promos to according to id ")
    
    });
    // create new id
promoRouter.post('/',(req, res, next) => {
    Promos.create(req.body)
    .then((promo)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promo);
       }, (err) => next(err))
       .catch((err) => next(err));
});
    // update the id
promoRouter.put('/:id',(req,res)=>{
        res.end('we Will update promo id : ' + req.body.name + ' with details: ' + req.body.description);
    })
    // delete the id
promoRouter.delete('/:id',(req,res)=>{
        res.end('we will delete this by id : ' + req.body.name + ' with details: ' + req.body.description);
    });
    module.exports=promoRouter;