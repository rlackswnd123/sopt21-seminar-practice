console.log("------------case 1-----------");

function scopeTest() {
  var a = 0;
  if (true) {
    var b = 0;
    for (var c = 0; c < 5; c++) {
      console.log("c=" + c);
    }
    console.log("c=" + c); // 5
  }
  console.log("b=" + b); // 0
}
scopeTest();
//console.log("a=" + a);
// ReferenceError: a is not defined

console.log("------------case 2-----------");

function scopeTest2() {
     console.log("test1 : " + name);
     var name = "Kim";
     console.log("test2: " + name);
}
scopeTest2();