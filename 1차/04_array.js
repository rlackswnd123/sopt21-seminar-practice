
var arr1 = [100, 200, 300];

arr1[5] = 600;

console.log(arr1);

arr1.push(700);

console.log(arr1);

var arr2 = [5,6,7];
arr2.name = "property test!";
arr2.length = 2;
arr2.size = 10;

for(var index in arr2){
	console.log(index, arr2[index]);
}