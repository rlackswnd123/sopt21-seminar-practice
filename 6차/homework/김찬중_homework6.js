const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const pool = require('../config/dbpool');
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

router.post('/',upload.array('image',2),function(req, res) {
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
            let insertQuery = 'insert into news (title,date,company,thumnail,text,content) values(?,?,?,?,?,?)';
            let result={
                title: req.body.title,
                date: moment().format("YYYYMMDDhhmmss"),
                company: req.body.company,
                thumnail: req.files[0].location,
                text: req.body.text,
                content: req.files[1].location
            };
            connection.query(insertQuery,[result.title,result.date,result.company,result.thumnail,result.text,result.content],(err)=>{
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
                        message: "success"
                    });
                    connection.release();
                    callback(null, "successful data");
                }
            });
        }
    ];
    async.waterfall(task, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });
});

module.exports = router;