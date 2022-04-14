const fs = require('fs');
// Dosyanın ismini yeniden isimlendirme

fs.rename('Olusumlar/deneme.txt', 'Olusumlar/deney.txt' ,function(error){

    if(error){
        console.log(error);
    }else{
        console.log("Dosya ismi değiştirildi.");
    }

});