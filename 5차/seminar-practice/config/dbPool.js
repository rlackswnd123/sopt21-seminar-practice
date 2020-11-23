const mysql = require('mysql');
const dbConfig = {
	host : 'ytkimdb.cyhhsuwkhdec.ap-northeast-2.rds.amazonaws.com',
	port : 3306, //mysql 포트
	user : 'ytkim55', 
	password : 'yt895620',
	database : 'sopt5th',
	connectionLimit : 25
};

module.exports = mysql.createPool(dbConfig);