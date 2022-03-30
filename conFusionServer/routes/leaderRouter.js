const express = require('express');
const leaderRouter = express.Router();
console.log("we are in leader router folder")

leaderRouter.get('/',(req, res)=>{
    res.end("we will send the names of all leaders")
});
// get by id
leaderRouter.get('/:id',(req, res)=>{
    res.end("we will send all dishes to according to id ")
    
    });
    // create new id
leaderRouter.post('/:id',(req, res) => {
        res.end('Will add the leader id: ' + req.body.name + ' with details: ' + req.body.description);
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