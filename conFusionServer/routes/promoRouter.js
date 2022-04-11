const express = require('express');
const promoRouter = express.Router();
const Promos = require('../models/promoSchema')
const mongoose =require('mongoose');
var authenticate = require('../authenticate');


//promo get all  
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



// promo get by id
promoRouter.get('/:id',(req,res,next) => {

    //console.log('we are in get by id ' , dish);
    Promos.findById(req.params.id)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
});
    // create new id by post
promoRouter.post('/',authenticate.verifyUser,(req, res, next) => {
    Promos.create(req.body)
    .then((promo)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promo);
       }, (err) => next(err))
       .catch((err) => next(err));
});
    // update the id by put
    promoRouter.put('/:id',authenticate.verifyUser,(req,res)=>{
        //res.end('we Will update dish id : ' + req.body.name + ' with details: ' + req.body.description);
        Promos.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
    })


    // delete by id
promoRouter.delete('/:id',authenticate.verifyUser,authenticate.verifyUser,(req, res, next) => {
        Promos.findByIdAndRemove(req.params.id)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });
    module.exports=promoRouter;