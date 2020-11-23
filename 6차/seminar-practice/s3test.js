const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const pool = require('../config/dbPool');
aws.config.loadFromPath('./config/iam.json');
const async = require('async');
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sopt21th',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    }
  })
});

router.post('/', upload.array('image', 2), function(req, res) {
  let file1 = req.files[0].location;
  let file2 = req.files[1].location;
  let task = [
    (callback) => {
      pool.getConnection((err, connection) => {
        if (err) {
          res.status(500).send({
            msg: "server error",
            stat: "fail"
          });
          callback("get connection error : " + err);
        } else {
          callback(null, connection);
        }
      });
    },
    (connection, callback) => {
      let insertImageQuery = 'insert into multer values(?,?,?)';
      connection.query(insertImageQuery, [null, file1, file2], (err) => {
        if (err) {
          res.status(500).send({
            msg: "server error",
            stat: "fail"
          });
          connection.release();
          callback("get connection error : " + err);
        } else {
          res.status(201).send({
            msg: "successful upload files",
            stat: "success"
          });
          connection.release();
          callback(null, "successful upload files");
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