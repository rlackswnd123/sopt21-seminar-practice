const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const json2csv = require('json2csv');

router.post('/',function(req,res){
    var value={
        name : req.body.name,
        age : req.body.age
    }
    
    return new Promise((fulfill,reject)=>{
        crypto.randomBytes(32,function(err,salt){
            if(err) reject(err);
            else{
                var afterSalt = salt.toString('base64');
                value.salt=afterSalt;
                fulfill(afterSalt)
                }
        })
    })
        .catch(err => {
        console.log(err);
    })
        .then(afterSalt =>{
        return new Promise((fulfill,reject)=>{
            crypto.pbkdf2(req.body.pwd,afterSalt,10000,64,'sha512',function(err,hashed){
                if(err) reject(err,null);
                else{
                    value.pwd = hashed.toString('base64');
                    let field = ['name','pwd','salt','age'];
                    let object = json2csv({
                        data : value, 
                        fields : field 
                    });
                    fulfill(object)
                }
            })
        })
    })
        .catch(err=>{
        console.log(err);
    })
        .then(object =>{
        return new Promise((fulfill, reject) => {
            fs.writeFile('./김찬중_promise.csv',object,function(err){
                if(err) reject(err)
                else fulfill("Successful save data!");
            })
        })
    })
        .catch(err => {
        console.lig(err);
    })
        .then(msg => {
        return new Promise((fulfill, reject) => {
            res.writeHead(201, {
                "Content-Type": "text/plain"
            });
            res.end("successful save hashed data");
            console.log(msg);
        })
    })
})

module.exports = router;