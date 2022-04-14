// tarayıcı 
// IIEFE

        // var controllerA = (function(){
        //     // scope A

        //     var log = function(){
        //         console.log(this.firstName);
        //     }

        //     var firstName = "Sadık";
        //     return {
        //         firstName,log
        //     }
        // })();

// node.js
// private members
var age = 30;

// public members
var firstName = 'Sadık'
var log = function(name){
    console.log(name);
}

// Alttaki 3 yöntemde kullanılabilir.

// module.exports.name = firstName;
// module.exports.log = log;

// module.exports = {
//     name: firstName,
//     log: log
// }

module.exports = {
    firstName,
    log
}