const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs');
const json2csv = require('json2csv');
const async = require('async');

router.post('/',function(req,res){
    var value={
        name : req.body.name,
        age : req.body.age
    }
    
    let taskArray = [
        function(callback){
            crypto.randomBytes(32,function(err,salt){
                if(err) callback(err,null)
                else{
                    var afterSalt = salt.toString('base64');
                    value.salt=afterSalt;
                    callback(null,afterSalt)
                }
            })
        },
        function(afterSalt,callback){
            crypto.pbkdf2(req.body.pwd,afterSalt,10000,64,'sha512',function(err,hashed){
                if(err) callback(err,null);
                else{
                    value.pwd = hashed.toString('base64');
                    let field = ['name','pwd','salt','age'];
                    let object = json2csv({
                        data : value, 
                        fields : field 
                    });
                    callback(null,object)
                }
            })
        },
        function(object,callback){
            fs.writeFile('./김찬중_flowcontrol.csv',object,function(err){
                if(err) callback(err,null)
                else callback(null);
        })
        },
        function(callback){
            console.log("successful write csv");
            res.writeHead(201,{"Content-Type": "text/plain;charset=utf-8"});
            res.end('successful write csv');
        }
    ]
    async.waterfall(taskArray,function(err,result){
        if(err) console.log(err)
        else console.log(result);
    })
})

module.exports = router;