const fs = require('fs');
// Dosya içini okuma

const data = fs.readFile('Olusumlar/index.html', 'utf8', function(error, data){

    if(error){
        console.log(error);
    }else{
        console.log(data);
    }

});