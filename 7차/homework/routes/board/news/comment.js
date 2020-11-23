const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../../config/dbPool');
const moment = require('moment');

router.post('/',(req,res)=>{
    let taskArray =[
        (callback)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    res.status(500).send({
                        status : 'fail',
                        message : 'get connection error'
                    });
                    callback("get connection error"+ err);
                }else callback(null,connection);
            })
        },
        (connection,callback)=>{
            let insertQuery = "insert into comment values(?,?,?,?,?)";
            let inform = {
                content: req.body.content,
                id: req.body.id,
                email: req.body.email,
                time: moment().format("YYYYMMDDhhmmss")
            }
            connection.query(insertQuery,[null,inform.content,inform.id,inform.email,inform.time],(err)=>{
                if(err){
                    res.status(500).send({
                        status : "fail",
                        message : "regist comment data error"
                    });
                    connection.release();
                    callback("insert err : " + err);
                }else{
                    res.status(201).send({
                        status : "success",
                        msg : "successful regist comment data"
                    });
                    connection.release();
                    callback(null, "successful regist comment data");
                }
            });
        }];
    async.waterfall(taskArray,function(err,data){
        if(err) console.log(err);
        else console.log(data);
    });
})
module.exports = router;