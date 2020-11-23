const mysql = require('mysql');
const dbConfig = {
	host : '',
	port : 3306,
	user : '',
	password : '',
	database : '',
	connectionLimit : 25 
};

module.exports = mysql.createPool(dbConfig);