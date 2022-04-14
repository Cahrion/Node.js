const fs = require('fs');
// Dosya içine yazma yoksa oluşturma

fs.appendFile('Olusumlar/deneme.txt', 'Hello World', function(error){
    // Ikinci parametre içine yazacak şey belirtilir.

    if(error){
        console.log(error);
    }else{
        console.log("Dosya Başarıyla oluşturuldu veya eklendi.");
    }

});