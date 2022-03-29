const express = require('express');
const promoRouter = express.Router();

console.log("we are in promotion router")
promoRouter.get('/', (res,req)=>{
    res.end("we will send all promotions to according to id ")
})
// get by id
promoRouter.get('/:id',(req, res)=>{
    res.end("we will send  promos to according to id ")
    
    });
    // create new id
    promoRouter.post('/:id',(req, res) => {
        res.end('Will add the promo id: ' + req.body.name + ' with details: ' + req.body.description);
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