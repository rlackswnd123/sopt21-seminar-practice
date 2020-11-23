const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const json2csv = require('json2csv');
const fs = require('fs');
const async = require('async');

router.get('/', function(req, res) {
  res.status(200).send({
      stat : "success",
      data : {
          name : "김찬중",
          age : 25,
          univ : "대진대학교",
          department: "컴퓨터공학과"
      },
      msg : "successful find data"
  })
});

router.post('/', function(req, res) {
    console.log(req.body);
    let taskArray = [
        function(callback){
            crypto.randomBytes(32,function(err,buffer){
                if(err) callback(err,null)
                else callback(err,buffer.toString('base64'));
            });
        },
        function(salt,callback){
            {
                crypto.pbkdf2(req.body.pwd,salt,10000,64,'sha512',function(err,hashed){
                    if(err) callback(err,null)
                    else {  
                        req.body.pwd = hashed.toString('base64');
                        let field = ['name','pwd','age','salt'];
                        let object = json2csv({
                            data : {
                                name : req.body.name,
                                pwd : req.body.pwd,
                                age : req.body.age,
                                salt : salt
                            },
                            fields : field
                        });
                        callback(null,object)
                    }
                })
            }
        },
        function(result,callback){
        fs.writeFile('./김찬중_Training1.csv',result,function(err){
        if(err) callback(err,null);
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
});
module.exports = router;
