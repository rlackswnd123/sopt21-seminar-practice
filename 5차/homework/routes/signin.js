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
                        msg : "DB connection err"
                    });
                    callback("DB connection err:" + err);
                } else callback(null,connection);
            });
        },
        function(connection,callback){
            let selectQuery = "select * from users where user_mail=?";
            connection.query(selectQuery,req.body.mail,function(err,result){
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB select fail"
                    });
                    connection.release();
                    callback("DB select fail")
                }else if(result.length==0){
                    res.status(400).send({
                        stat : 'fail',
                        msg : "login fail"
                    });
                    connection.release();
                    callback("login email fail")
                }else callback(null,connection,result);
            })
        },
        function(connection,result,callback){
            crypto.pbkdf2(req.body.pwd,result[0].user_salt,10000,64,'sha512',function(err,hashed){
                if(err){
                    connection.release();
                    callback("crypto pbkdf2 err" + err)
                }
                else
                {
                    afterPwd = hashed.toString('base64');
                    callback(null,connection,result,afterPwd);
                }
            })
        },
        function(connection,result,afterPwd,callback){
            if(afterPwd==result[0].user_pwd){
                res.status(201).send({
                    user_name : result[0].user_name
                })
                connection.release();
                callback(null,"successful login");
            }else{
                res.status(400).send({
                    stat : 'fail',
                    msg : "login fail"
                });
                connection.release();
                callback("pwd compare fail");
            }
        }
    ]
    async.waterfall(taskArray,function(err,result){
        if(err) console.log(err);
        else console.log(result);
    });
});
module.exports = router;