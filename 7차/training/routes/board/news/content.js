const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const pool = require('../../../config/dbpool');
aws.config.loadFromPath('./config/aws_config.json');
const async = require('async');
const s3 = new aws.S3();
const moment = require('moment');
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

router.post('/',upload.single('image'), function(req, res) {
    let task = [
        (callback) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    res.status(500).send({
                        status: "fail",
                        message: "get conection error"
                    });
                    callback("get connection error : " + err);
                }else {
                    callback(null,connection);
                }
            });
        },
        (connection, callback) => {
            let insertQuery = 'insert into board (title,content,image,useremail,hits) values(?,?,?,?,?)';
            let result={
                title: req.body.title,
                content: req.body.content,
                image: req.file.location,
                email: req.body.email
            };
            console.dir(result);
            connection.query(insertQuery,[result.title,result.content,result.image,result.email,1],(err)=>{
                if (err) {
                    res.status(500).send({
                        status: "fail",
                        message: "insert err"
                    });
                    connection.release();
                    callback("insert error : " + err);
                }else {
                    res.status(201).send({
                        status: "success",
                        message: "successful regist board data"
                    });
                    connection.release();
                    callback(null, "successful regist board data");
                }
            });
        }
    ];
    async.waterfall(task, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });
});

router.get('/:boardid/:useremail',function(req, res) {
    let task = [
        (callback) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    res.status(500).send({
                        status: "fail",
                        message: "get connection error",
                    });
                    callback("get connection error : " + err);
                }else callback(null,connection);
            });
        },
        (connection, callback) => {
            let selectQuery = 'select * from board where boardid=? and useremail=?';
            connection.query(selectQuery,[req.params.boardid,req.params.useremail],(err,result) => {
                console.log(req.params.boardid);
                console.log(req.params.useremail);
                if (err) {
                    res.status(500).send({
                        status: "fail",
                        message: "select error"
                    });
                    connection.release();
                    callback("select error : " + err);
                }else {
                    res.status(200).send({
                        status: "success",
                        data: result,
                        msg: "successful load board content"
                    })
                    callback(null,connection);
                }
            })
        },
        (connection,callback)=>{
            let updateQuery = 'update board set hits=hits+1 where boardid=? and useremail=?';
            connection.query(updateQuery,[req.params.boardid,req.params.useremail],(err) =>{
                if (err) {
                    res.status(500).send({
                        status: "fail",
                        message: "update error"
                    });
                    connection.release();
                    callback("update error : " + err);
                }else {
                    console.log('hits+1');
                    connection.release();
                    callback(null, "successful load board content");
                }
            })
        }
    ];
    async.waterfall(task, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });
})

module.exports = router;