const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config/aws_config.json');
const async = require('async');
const s3 = new aws.S3();
const moment = require('moment');
const pool = require('../config/dbPool');
const crypto = require('crypto');
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sopt21test',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, moment().format("YYYYMMDDhhmmss") + '.' + file.originalname.split('.').pop());
        console.log(file);
    }
  })
});

router.post('/',upload.single('image'),function(req,res){
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
                else{
                    let afterPwd = hashed.toString('base64');
                    callback(null,afterSalt,afterPwd);
                }
            });
        },
        function(afterSalt,afterPwd,callback){
            pool.getConnection((err,connection)=>{
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "get conection error"
                    });
                    callback("get conection error: " +err);
                } else callback(null,afterSalt,afterPwd,connection);
            });
        },
        function(afterSalt,afterPwd,connection,callback){
            let selectQuery = "select * from users where email=?";
            connection.query(selectQuery,req.body.email,function(err,data){
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB select fail"
                    });
                    connection.release();
                    callback("DB select err : " + err);
                }else if(data.length==!0){
                    res.status(401).send({
                        status : 'fail',
                        msg : "email overlap"
                    });
                    connection.release();
                    callback("email overlap");
                }else callback(null,afterSalt,afterPwd,connection);
            })
        },
        function(afterSalt,afterPwd,connection,callback){
            let insertSignupQuery = "insert into users values(?,?,?,?,?,?)";
            let inform ={
                email : req.body.email,
                pwd : afterPwd,
                nickname : req.body.nickname,
                image : req.file.location
            };
            connection.query(insertSignupQuery,[null,inform.email,inform.pwd,inform.nickname,inform.image,afterSalt],function(err){
                if(err){
                    res.status(500).send({
                        status : 'fail',
                        message : "insert user data error"
                    });
                    connection.release();
                    callback("insert user data error : " + err);
                } else{
                    res.status(201).send({
                        status : 'success',
                        msg : "successful signup"
                    }),
                    connection.release();
                    callback(null,"successful signup");
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