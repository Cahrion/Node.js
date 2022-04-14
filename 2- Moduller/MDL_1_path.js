const path  = require('path');

let result  = path.resolve('MDL_1_path.js'); // Yolunu verir.
result  = path.extname('MDL_1_path.js'); // Uzantısını verir.
result  = path.parse(__filename); // dosyanın özelliklerini verir.

console.log(result.root);
console.log(result.dir);
console.log(result.base);
console.log(result.ext);
console.log(result.name);

console.log(result);