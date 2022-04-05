const express =require('express');
const dishrouter = express.Router();
const mongoose =require('mongoose');
const Dishes = require('../models/dishes')
console.log("we are in router folder")


dishrouter.get('/',(req, res,next)=>{
    //res.end("we will send all dishes to you")
    console.log("we are in the get request ")
    Dishes.find({})
    .then((dish) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// get by id
dishrouter.get('/:id',(req,res,next) => {

    //console.log('we are in get by id ' , dish);
    Dishes.findById(req.params.id)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
        console.log('we are in post ' , dish);
    }, (err) => next(err))
    .catch((err) => next(err));
});
// create new id
dishrouter.post('/',(req, res, next) => {
    //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.create(req.body)
     .then((dish)=>{
        console.log('we are in post ' , dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
});
// update the id
dishrouter.put('/:id',(req,res)=>{
    //res.end('we Will update dish id : ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})



// delete the id
dishrouter.delete('/',(req,res, next)=>{
   // res.end('we will delete this by id    : ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

dishrouter.delete('/:id',(req, res, next) => {
    Dishes.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = dishrouter;