var num1 = 1;
var num2 = 2;
var num3 = 0.1;
var num4 = 0.2;

var str1 = 'Hello';
var str2 = "SOPT";


console.log(num1 + num2); //정수 + 정수;
console.log(num3 + num4); //실수 + 실수;
console.log(num1 + num3); //정수 + 실수;

console.log(str1 + str2); //문자열 + 문자열;

console.log(num1 + str1); //숫자 + 문자열;

/*헤헤 요게 좀 골때려요
console.log(str2 + num2 + num1); //문자열 + 숫자 + 숫자;
console.log(num1 + num2 + str1); //숫자 + 숫자 + 문자열;
*/

var func1 = function(){
	return 5;
}

var arr1 = ['H','i','!'];

var obj1 = {
	property1 : "string",
	property2 : 2
};

console.log(typeof func1);
console.log(typeof arr1);
console.log(typeof obj1);