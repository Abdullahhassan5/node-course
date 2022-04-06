const express = require('express');
const leaderRouter = express.Router();
const Leader = require('../models/leader')
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
leaderRouter.post('/',(req, res, next) => {
    Leader.create(req.body)
    .then((leader)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});
    // update the id
leaderRouter.put('/:id',(req,res)=>{
        res.end('we Will update leader id : ' + req.body.name + ' with details: ' + req.body.description);
    })
    // delete the id
leaderRouter.delete('/:id',(req,res)=>{
        res.end('we will delete this by id : ' + req.body.name + ' with details: ' + req.body.description);
    });

module.exports = leaderRouter;