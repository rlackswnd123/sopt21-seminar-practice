const express = require('express');
const router = express.Router();


router.get('/:name/:age',function(req,res){
    console.log('echo 접근');
    res.status(200).send({
        stat : 'success',
        data : {
            name : req.params.name,
            age : req.params.age
        },
        msg : "successful find data"
    })
});

router.post('/',function(req,res){
    res.status(201).send({
        stat : 'success',
        data : {
            name : req.body.name,
            age : req.body.age
        },
        msg : "successful find data"
    })
});

module.exports = router;