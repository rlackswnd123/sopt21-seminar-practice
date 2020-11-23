var integerType = 5;
var floatType = 0.5;
//정수, 실수 둘다 Number 타입이고 이는 64bit 실수형입니다.

var singleQuoteStringType = '작은따옴표 스트링';
var doubleQuoteStringType = "큰따옴표 스트링";
//큰따옴표를 쓰던, 작은따옴표로 쓰던 둘다 스트링으로 처리합니다.
var charactorType = 'A';
//한글자의 charactor도 string으로 처리합니다.

var booleanType = true; // true false는 소문자로 적습니다.

var undefinedType;

var nullType = null; //null도 소문자로 적습니다.


//출력은 console.log(내용)을 사용합니다. 
console.log(
	typeof integerType,
	typeof floatType,
	typeof singleQuoteStringType,
	typeof doubleQuoteStringType,
	typeof charactorType,
	typeof booleanType,
	typeof undefinedType,
	typeof nullType
); // console.log 끝에는 개행문자가 자동으로 삽입됩니다.


