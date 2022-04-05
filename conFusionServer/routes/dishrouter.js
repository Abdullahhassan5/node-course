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

// handling the comments here

dishrouter.get('/:id/comments',(req,res,next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


dishrouter.post('/',(req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if (dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


dishrouter.delete('/:id',(req, res, next) => {
    Dishes.findById(req.params.id)
    .then((dish) => {
        if (dish != null) {
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = dishrouter;