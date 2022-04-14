const fs = require('fs');
// Dosya oluşturma

fs.writeFile('Olusumlar/deneme.txt', 'Hello World', function(error){
    // Eğer içerik varsa onu siler ve yeni bir içerik oluşturur.
    // Ikinci parametre içine yazacak şey belirtilir.

    if(error){
        console.log(error);
    }else{
        console.log("Dosya Başarıyla oluşturuldu.");
    }

});