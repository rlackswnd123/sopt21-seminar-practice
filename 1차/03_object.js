var server1 = {
  "name": "김연태",
  "age": 26,
  "married": false
};

var server2 = {
  name: "김연태",
  age: 26,
  married: false
};

console.log(server1);
console.log(server2);

//Object() 생성자 함수를 이용한 JSON객체 생성
var server3 = new Object();
server3.name = "김연태";
server3.age = 26;
server3.married = false;

//객체 리터럴 방식을 사용한 JSON객체 생성
var server4 = {
  name: "김연태",
  age: 26,
  married: false
}

console.log("-------------객체 생성 비교-----------------");
console.log(server3);
console.log(server4);


console.log("-------------객체 프로퍼티 읽기-----------------");
console.log(server1["name"]);
//console.log(server1[name]); //프로퍼티 이름을 문자열로 처리해주지 않았을때
console.log(server1.name);

console.log("-------------for in 문으로 순회-----------------");
for(var index in server1){
	console.log(index, server1[index]);
}
console.log("-------------delete로 삭제 후 순회-----------------");
delete server1.name;
for(var index in server1){
	console.log(index, server1[index]);
}
