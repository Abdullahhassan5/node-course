const express = require('express');
const leaderRouter = express.Router();
const Leader = require('../models/leader')
const authenticate = require('../authenticate')
console.log("we are in leader router folder")

leaderRouter.get('/', (req,res,next)=>{
    Leader.find({})
    .then((leader) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// get by id
leaderRouter.get('/:id',(req,res,next) => {

    //console.log('we are in get by id ' , dish);
    Leader.findById(req.params.id)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});
    // create new id by post
leaderRouter.post('/',authenticate.verifyUser,(req, res, next) => {
    Leader.create(req.body)
    .then((leader)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});
    // update the id
    leaderRouter.put('/:id',authenticate.verifyUser,(req,res)=>{
        //res.end('we Will update dish id : ' + req.body.name + ' with details: ' + req.body.description);
        Leader.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    })


    // delete by id
    leaderRouter.delete('/:id',authenticate.verifyUser,(req, res, next) => {
        Leader.findByIdAndRemove(req.params.id)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

module.exports = leaderRouter;