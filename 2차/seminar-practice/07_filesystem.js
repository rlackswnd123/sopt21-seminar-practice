const fs = require('fs');

const readFile = function(){
	fs.readFile('./test.txt', 'utf-8', function(err, data){
		if(err){
			console.log("read file error : "+ err);
		} else{
			console.log("successful read file!");
			console.log(data);
		}
	});
}

const writeFile = function(){
	let data = 'write file!';
	fs.writeFile('./test.txt', data, 'utf-8', function(err){
		if(err){
			console.log("write file error : "+err);
		}	else{
			console.log("successful write file!");
		}
	});
}

readFile();
//writeFile();
