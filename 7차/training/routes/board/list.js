const express  = require('express');
const router = express.Router();
const async = require('async');
const pool = require('../../config/dbPool');

router.get('/', (req, res) => {
    let task = [
        (callback) => {
            pool.getConnection((err, connection) => {
                if(err) {
                    res.status(500).send({
                        status : 'fail',
                        message : 'get connection error'
                    });
                    callback('get connection error : ' + err);
                }else callback(null, connection);
            });
        },
        (connection, callback) => {
            let selectQuery = 'select * from board';
            connection.query(selectQuery,function(err, result){
                if(err) {
                    res.status(500).send({
                        status : 'fail',
                        message : 'get board lists error'
                    });
                    connection.release();
                    callback('get board lists error : ' + err);
                }else{
                    res.status(200).send({
                        status : 'success',
                        data : result,
                        msg : 'successful get board lists'
                    });
                    connection.release();
                    callback('successful get board lists');
                }
            });
        }
    ];
    async.waterfall(task, (err, data) => {
        if(err) console.log(err);
        else console.log(data);
    });
});
module.exports = router;