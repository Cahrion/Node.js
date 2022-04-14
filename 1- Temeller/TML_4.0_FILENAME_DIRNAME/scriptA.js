console.log(__filename);    // Dosya yolu
console.log(__dirname);     // Dizin yolu

var firstName = 'Sadık'
var log = function(name){
    console.log(name);
}
exports = { // Bu metin oluşturulan yapıda da bulunduğundan dolayı kısaca exports yazılabilir.
    firstName,
    log
}