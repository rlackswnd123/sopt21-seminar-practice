const fs = require('fs');
const crypto = require('crypto');
const http = require('http');


http.createServer(function(req, res) {
  let beforeHashing = 'Example Password';

  crypto.randomBytes(32, function(err, buffer) {
    if (err) {
      console.log(err);
    } else {
      crypto.pbkdf2(beforeHashing, buffer.toString('base64'), 100000, 64, 'sha512', function(err, hashed) {
        if (err) {
          console.log(err);
        } else {
          let afterHashing = hashed.toString('base64');
          fs.writeFile('./hashed.txt', afterHashing, 'utf-8', function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successful save data!");
              res.writeHead(201, {
                "Content-Type": "text/plain"
              });
              res.end("successful save hashed data");
            }
          });
        }
      });
    }
  });
}).listen(3000, function(){
	console.log("Server running on port 3000!");
})

