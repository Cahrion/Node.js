const fs = require('fs');
// Dosya silme

fs.unlink('Olusumlar/deneme.txt', function(error){

    if(error){
        console.log(error);
    }else{
        console.log("Dosya Başarıyla silindi");
    }

});