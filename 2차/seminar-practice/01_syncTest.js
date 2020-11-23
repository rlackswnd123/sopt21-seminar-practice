/*
setTimeout(function() {
  console.log('frist done!');
}, 10000);

setTimeout(function() {
  console.log('second done!');
}, 5000);
*/


setTimeout(function() {
  console.log('frist done!');
  setTimeout(function() {
    console.log('second done!');
  }, 5000);
}, 10000);
