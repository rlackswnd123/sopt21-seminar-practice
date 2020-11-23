const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../config/dbPool');
const moment = require('moment');

router.get('/:category',(req,res)=>{
    var YYYYMMDD = moment().format('YYYYMMDD');
    console.log(YYYYMMDD);
    var past = moment().subtract(3,'days').format('YYYYMMDDhhmmss');
    console.log(past);
            
    let taskArray = [
        function(callback){
             pool.getConnection((err,connection)=>{
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB connection err"
                    });
                    callback("DB connection err: " +err);
                } else callback(null,connection);
            });
        },
        function(connection,callback){
            let deleteQuery = "delete from article where article_date<?";
            connection.query(deleteQuery,past,(err,data)=>{
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB delete fail"
                    });
                    connection.release();
                    callback("DB delete quey err : " + err);
                }else callback(null, connection);
            })
        },
        function(connection,callback){
            let selectQuery = "select * from article where article_category=? and article_date=?";
            connection.query(selectQuery,[req.params.category,YYYYMMDD],(err,data)=>{
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB select fail"
                    });
                    connection.release();
                    callback("DB select quey err : " + err);
                }else {
                    console.dir(data);
                    let today = {
                        id : data[0].article_id,
                        title : data[0].article_title,
                        press : data[0].article_press,
                        date : data[0].article_date,
                        newname : data[0].article_newsname,
                        citizenname : data[0].article_citizenname,
                        category : data[0].article_category
                    }
                    callback(null, connection, today);
                }
            })
        },
        function(connection,today,callback){
            let selectQuery = "select * from article where article_category=? and article_date>=?";
            connection.query(selectQuery,[req.params.category,past],(err,result)=>{
                if(err){
                    res.status(500).send({
                        stat : 'fail',
                        msg : "DB select fail"
                    });
                    connection.release();
                    callback("DB select quey err : " + err);
                }else {
                    let dataArray = [];
                    for(let i = 0 ; i<result.length ; i++){
                        let pastday = {
                            id : result[i].article_id,
                            title : result[i].article_title,
                            press : result[i].article_press,
                            date : result[i].article_date,
                            newname : result[i].article_newsname,
                            citizenname : result[i].article_citizenname,
                            category : result[i].article_category
                        }
                        dataArray.push(pastday);
                    }
                    connection.release();
                    callback(null,today,dataArray);
                }
            })
        },
        function(today,dataArray,callback){
         res.status(200).send({
            msg : "success",
            data : {
               today : today,
               pastday : dataArray
            }
         });
         callback(null,"success");
      }
    ]
    async.waterfall(taskArray,function(err,result){
        if(err) console.log(err);
        else console.log(result);
    })
});
module.exports = router;