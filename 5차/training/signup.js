const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../config/dbPool');
const crypto = require('crypto');

router.post('/', (req,res)=>{
    let taskArray = [
        function(callback){
            crypto.randomBytes(32,function(err,salt){
                if(err) callback(err)
                else{
                    let afterSalt = salt.toString('base64');
                    callback(null,afterSalt)
                }
            });
        },
        function(afterSalt,callback){
            crypto.pbkdf2(req.body.pwd,afterSalt,10000,64,'sha512',function(err,hashed){
                if(err) callback(err,null);
                else afterPwd = hashed.toString('base64');
                callback(null,afterSalt,afterPwd);
            });
        },
        function(afterSalt,afterPwd,callback){
            pool.getConnection((err,connection)=>{
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB connection err"
                    });
                    callback("DB connection err: " +err);
                } else callback(null,afterSalt,afterPwd,connection);
            });
        },
        function(afterSalt,afterPwd,connection,callback){
            let selectQuery = "select * from users where user_mail=?";
            connection.query(selectQuery,req.body.mail,function(err,data){
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB select fail"
                    });
                    connection.release();
                    callback("DB select query err : " + err);
                }else if(data.length==!0){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "email be duplicated"
                    });
                    connection.release();
                    callback("email be duplicated");
                }else callback(null,afterSalt,afterPwd,connection);
            })
        },
        function(afterSalt,afterPwd,connection,callback){
            let insertSignupQuery = "insert into users values(?,?,?,?,?)";
            connection.query(insertSignupQuery,[null,req.body.mail,afterPwd,afterSalt,req.body.name],function(err){
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB insert fail"
                    });
                    connection.release();
                    callback("DB insert query err : " + err);
                } else{
                    res.status(201).send({
                        stat : 'success',
                        msg : "successful DB insert"
                    }),
                    connection.release();
                    callback(null,"successful DB insert");
                }
            })
        }
    ]
    async.waterfall(taskArray,function(err,result){
        if(err) console.log(err);
        else console.log(result);
    });
});
module.exports = router;