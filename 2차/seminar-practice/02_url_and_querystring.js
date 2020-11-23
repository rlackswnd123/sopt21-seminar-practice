const url = require('url');
const querystring = require('querystring');

let urlPath = 'https://www.google.co.kr/search?q=%EC%BF%BC%EB%A6%AC+%ED%85%8C%EC%8A%A4%ED%8A%B8&oq=%EC%BF%BC%EB%A6%AC+%ED%85%8C%EC%8A%A4%ED%8A%B8&aqs=chrome..69i57j0l5.3222j0j7&sourceid=chrome&ie=UTF-8';

let urlParsed = url.parse(urlPath);
let queryParsed = querystring.parse(urlParsed.query);

console.log(urlParsed);
console.log(queryParsed);
