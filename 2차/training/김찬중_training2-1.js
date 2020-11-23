const http = require('http');
const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');
let json = {};

const server = http.createServer(function(req,res){

    let urlParsed = url.parse(req.url);
    let queryParsed= querystring.parse(urlParsed.query);
    
    queryParsed.str = 'value';
    
    crypto.randomBytes(32, function(err, buffer){  
        if(err){
            console.log(err);
        }else{
            crypto.pbkdf2(queryParsed.str, buffer.toString('base64'), 100000, 64, 'sha512',function(err, hashed){
                if(err){
                    console.log('pbkdf2 error' + err);
                    res.writeHead(200, { 'Context-Type' : 'application/json; charset=utf-8'});
                    json.msg = 'fail';
                    res.end(JSON.stringify(json));
                }else{
                    var hashed = hashed.toString('base64');
                    res.writeHead(200, { 'Context-Type' : 'application/json; charset=utf-8'});
                    json.msg = 'success',
                    json.hashed = hashed
                }
                res.end(JSON.stringify(json));
            })
        }
    })
}).listen(3000,function(){
    console.log('3000포트 서버 동작중!');
})