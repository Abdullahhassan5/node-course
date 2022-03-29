const express = require('express');
const dishrouter = express.Router();
console.log("we are in router folder")


dishrouter.get('/',(req, res)=>{
res.end("we will send all dishes to you")
});

// get by id
dishrouter.get('/:id',(req, res)=>{
res.end("we will send all dishes to according to id ")

});
// create new id
dishrouter.post('/:id',(req, res) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});
// update the id
dishrouter.put('/:id',(req,res)=>{
    res.end('we Will update dish id : ' + req.body.name + ' with details: ' + req.body.description);
})
// delete the id
dishrouter.delete('/:id',(req,res)=>{
    res.end('we will delete this by id : ' + req.body.name + ' with details: ' + req.body.description);

})
module.exports = dishrouter;