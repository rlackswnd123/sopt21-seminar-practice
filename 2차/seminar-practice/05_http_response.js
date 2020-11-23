const http = require('http');

const server = http.createServer(function(req,res){
	console.log(req.method);
	//요청 메소드 확인
	console.log(req.url);
	//요청 url 확인 
	res.writeHead(200, { 'Context-Type' : 'text/html; charset=utf-8'});
	res.write("<h1>Hello Node!<h1>");
	res.end();
}).listen(3000, function(){
	console.log('3000포트로 서버 동작중!');
});