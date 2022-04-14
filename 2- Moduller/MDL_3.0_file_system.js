const fs = require('fs');
// Dizin içini okuma

const files = fs.readdir('./', function(error, data){

    if(error){
        console.log(error);
    }else{
        console.log(data);
    }

});