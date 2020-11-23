const express = require('express');
const mysql = require('mysql');
const router = express.Router();

/* GET /newsList */
router.get('/newsList', function(req, res, next) {
   const resObj = {
      msg: null,
      data: {
         id: null,
         title: null,
         press: null,
         date: null,
         count: null,
         category: null
      }
   };
   const conn = mysql.createConnection(dbConfig);
   let selectAllQuery = "select * from newsList";
   conn.query(selectAllQuery, (err, result) => {
      if (err) {
         console.log(err);
         resObj.msg = "error";
         res.status(500).send(resObj);
         conn.end();
      } else {
         resObj.msg = "success";
         resObj.data = result;
         res.status(200).send(resObj);
         conn.end();
      }
   });
});

module.exports = router;
