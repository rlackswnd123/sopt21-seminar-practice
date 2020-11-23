const http = require('http');

const server = http.createServer();

server.listen(3000);

//터미널에서 실행해도 커서만 깜빡임, localhost:3000으로 접속해도 아무것도 뜨지 않음
//http 서버를 열기만 했지 아무런 응답코드를 쓰지 않았기 때문!