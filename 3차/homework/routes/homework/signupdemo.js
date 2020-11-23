const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const json2csv = require('json2csv');

router.post('/',function(req,res){
    value={
        name : req.body.name,
        age : req.body.age
    }
    
    crypto.randomBytes(32,function(err,salt){
        if(err) console.log("randomBytes error"+ err);
        
        else{
            var afterSalt = salt.toString('base64');
            
            value.salt=afterSalt;
            
            crypto.pbkdf2(req.body.pwd,afterSalt,10000,64,'sha512',function(err,hashed){
                if(err) console.log('hased error' + err);
                else{
                    value.pwd = hashed.toString('base64');
                }
                
                let field = ['name','pwd','salt','age'];
                let object = json2csv({
                    data : value, 
                    fields : field 
                });
                fs.writeFile('./김찬중_signupdemo.csv',object,function(err){
                    if(err) console.log("write csv error : " + err);
                    else{
                        console.log("successful write csv");
                        res.writeHead(201,{"Conten-Type" : "text/plain;charset=utf8"})
                        res.end('successful write csv');
                    }
                })
            })
        }
    })
})
module.exports = router;