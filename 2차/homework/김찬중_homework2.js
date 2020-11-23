const http = require('http');
const request = require('request');
const url = require('url');
const fs = require('fs');
const json2csv = require('json2csv');
const cryto = require('crypto');

const server = http.createServer(function(req,res){
    let urlParsed = url.parse(req.url); // req url parse
    
    if(urlParsed.path=='/test'){ //localhost:3000/test로 접속 시
        let option = {
            uri : 'http://52.78.124.103:3456/homework/2nd',
            method : 'GET'
        };
        request(option, function(err, response, body){
            if(err){
                console.log("Request module error : " + err);
                res.writeHead(500, {"Content-Type" : "text/plain"});
                res.end("Request module error!");
            }else{
                let bodyParsed = JSON.parse(body);
                console.log("Successful get response");
                res.writeHead(200, {"Content-Type" : "application/json;charset=utf-8"});
                res.end(JSON.stringify(bodyParsed.data));
            }
        })
    }
    
    else if(urlParsed.path=='/info'){   //localhost:3000/info로 접속 시
        let option = {
            uri : 'http://52.78.124.103:3456/homework/2nd',
            method : 'POST',
            form : {
                name : '김찬중',
                phone : '010-5104-4592'
            }
        };
        request(option, function(err, response, body){
            if(err){
                console.log("Request module error : " + err);
                res.writeHead(500, {"Content-Type" : "text/plain"});
                res.end("Request module error!" + err);
            }else{
                let bodyParsed = JSON.parse(body);
                cryto.randomBytes(32,function(err,buffer){ //---------비밀번호 암호화 시작
                    if(err){
                        console.log('randomBytes error'+ err);
                    }else{
                        cryto.pbkdf2(bodyParsed.data.phone,buffer.toString('base64'),10000,64,
                                     'sha512',function(err,hashed){
                            if(err){
                                console.log('hased error' + err);
                            }else{
                                bodyParsed.data.phone = hashed.toString('base64');
                                //----jsom2csv write csv 시작
                                let field = ['name','university','major','email','phone'];
                                let object = json2csv({
                                    data : bodyParsed.data,
                                    fields : field
                                });
                                fs.writeFile('./김찬중_homework2.csv', object, function(err){
                                    if(err){
                                        console.log("write csv error : "+ err);
                                    }else{
                                        console.log("successful write csv");
                                        res.writeHead(200, {"Content-Type" : "text/plain;charset=utf-8"});
                                        res.end('successful write csv');
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}).listen(3000,function(){
    console.log('3000포트 서버 동작중!');
})