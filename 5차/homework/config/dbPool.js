const mysql = require('mysql');
const dbConfig = {
	host : '',
	port : 3306,
	user : '',
	password : '',
	database : 'article',
	connectionLimit : 25 //RDS를 쓸때는 20~30이 최적화
};

module.exports = mysql.createPool(dbConfig);