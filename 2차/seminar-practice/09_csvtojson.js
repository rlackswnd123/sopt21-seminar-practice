const Converter = require('csvtojson').Converter;
const fs = require('fs');
const http = require('http');

const server = http.createServer(function(req, res) {
  let converter = new Converter({});
  let data = [];
  converter.fromFile('./music.csv', function(err, result) {
    if (err) {
      console.log("read csv file error : " + err);
    } else {
      console.log("successful read csv file");
      data = result;
      res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
      });
      res.end(JSON.stringify({
        msg: "success",
        data: data
      }));
    }
  });

}).listen(3000, function() {
  console.log("3000번 포트로 구동중!");
})