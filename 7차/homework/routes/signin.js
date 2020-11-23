var express = require('express');
var router = express.Router();
const async = require('async');
const pool = require('../config/dbPool');
const crypto = require('crypto');

router.post('/',function(req,res){
    let taskArray = [
        function(callback){
            pool.getConnection(function(err,connection){
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "get connection error"
                    });
                    callback("get connection error:" + err);
                } else callback(null,connection);
            });
        },
        function(connection,callback){
            let selectQuery = "select * from users where email=?";
            connection.query(selectQuery,req.body.email,function(err,result){
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB select fail"
                    });
                    connection.release();
                    callback("DB select fail" + err)
                }else if(result.length===0){
                    res.status(401).send({
                        stat : 'fail',
                        msg : "find user data error"
                    });
                    connection.release();
                    callback("find user data error")
                }else callback(null,connection,result);
            })
        },
        
        function(connection,result,callback){
            crypto.pbkdf2(req.body.pwd,result[0].salt,10000,64,'sha512',function(err,hashed){
                if(err){
                    connection.release();
                    callback("crypto pbkdf2 err" + err)
                }
                else
                {
                    let afterPwd = hashed.toString('base64');
                    callback(null,connection,result,afterPwd);
                }
            })
        },
        function(connection,result,afterPwd,callback){
            if(afterPwd===result[0].pwd){
                res.status(201).send({
                    status : "success",
                    data : {
                        email : result[0].email,
                        nickname : result[0].nickname,
                        profile : result[0].profile
                    },
                    msg : "successful signin"
                })
                connection.release();
                callback(null,"successful signin");
            }else{
                res.status(401).send({
                    stat : 'fail',
                    msg : "signin fail"
                });
                connection.release();
                callback("pwd compare fail");
            }
        }
    ]
    async.waterfall(taskArray,function(err,data){
        if(err) console.log(err);
        else console.log(data);
    });
});
module.exports = router;