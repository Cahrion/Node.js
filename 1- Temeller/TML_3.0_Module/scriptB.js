// tarayıcı 
// IIEFE

        // var controllerB = (function(){
        //     // scope B
        //     var firstName = "Turan";

            
        //     var log = function(){
        //         console.log(this.firstName);
        //     }

        //     return {
        //         firstName,log
        //     }
        // })();


        // console.log(controllerA.firstName);
        // console.log(controllerB.firstName);
        // console.log(window);

// Node.js

const scriptA = require('./scriptA');

scriptA.log("Çınar");
scriptA.log(scriptA.name);
// scriptA.log(scriptA.age);
