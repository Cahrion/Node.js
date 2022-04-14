const url = require('url');

const adress = "http://sadikturan.com/kurslar?year=2019&month=nisan";

let result = url.parse(adress, true); // query bilgisi object olsun mu sorusuna = "true" giriliyor.

console.log(result);
console.log(result.path);
console.log(result.query.year);
console.log(result.query.month);