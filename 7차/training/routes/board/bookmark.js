const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbPool');

router.put('/',function(req,res){
    let trans={
        useremail:req.body.useremail,
        boardid:req.body.boardid
    };
    let task=[
        function(callback){
            pool.getConnection(function(err,connection){
                if(err){
                    res.status(500).send({
                        status: "fail",
                        message: "connection error"
                    });
                    callback("get connection error : " + err);
                }else{
                    callback(null,connection);
                }
            })
        },
        function(connection,callback){
            let selectQuery="select * from bookmark where user_email=? and board_id=?";
            connection.query(selectQuery,[trans.useremail,trans.boardid],function(err,result){
                if(err){
                    res.status(500).send({
                        status : "fail",
                        message : "select err"
                    })
                    connection.release();
                    callback("select err" + err);
                }else{
                    callback(null,connection,result);
                }
            })
        },
        function(connection,result,callback){
            if(typeof (result[0]) === 'undefined') {
                let insertQuery = "insert into bookmark values(?,?,?)";
                connection.query(insertQuery,[null,trans.useremail,trans.boardid],function(err){
                    if(err){
                        res.status(500).send({
                            status : "fail",
                            message : "insert err"
                        })
                        connection.release();
                        callback("insert err" + err);
                    }else{
                        res.status(201).send({
                            status:"success",
                            msg:"successful regist bookmark"
                        });
                        connection.release();
                        callback(null,"successful insert bookmark");
                    }
                })
            }else{
                var deleteQuery="delete from bookmark where user_email=? and board_id=?";
                connection.query(deleteQuery,[trans.useremail,trans.boardid],function(err){
                    if(err){
                        res.status(500).send({
                            status:"fail",
                            message:"delete err"
                        });
                        connection.release();
                        callback("delete err" + err);
                    }else{
                        res.status(201).send({
                            status:"success",
                            msg:"successful delete bookmark"
                        });
                        connection.release();
                        callback(null,"successful delete bookmark")
                    }
                })
            }
        }
    ];
    async.waterfall(task,function(err,data){
        if(err) console.log(err);
        else console.log(data);
    });
});

module.exports=router;