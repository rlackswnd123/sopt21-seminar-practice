const express = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbPool');

router.get('/:useremail',function(req,res){
    let task = [
        function(callback){
            pool.getConnection(function(err,connection){
                if(err){
                    res.status(500).send({
                        status:"fail",
                        message:"get connection error"
                    })
                    callback("get connection error" + err);
                }else callback(null,connection);
            })
        },
        function(connection,callback){
            let selectQuery = "select * from bookmark where user_email=?";
            connection.query(selectQuery,req.params.useremail,function(err,result){
                if(err){
                    res.status(500).send({
                        status:"fail",
                        message:"select err"
                    })
                    connection.release();
                    callback("select err" + err);
                }else if(typeof(result[0])==='undefined'){
                    res.status(400).send({
                        status:"fail",
                        message:"get marked board data error"
                    })
                    connection.release();
                    callback("get marked board data error");
                }else{
                    res.status(200).send({
                        status:"success",
                        data:result,
                        message:"successful get bookmark lists"
                    })
                    connection.release();
                    callback(null,"successful get bookmark lists");
                }
            })
        }
    ];
    async.waterfall(task,function(err,data){
        if(err) console.log(err);
        else console.log(data);
    })
})
module.exports=router;