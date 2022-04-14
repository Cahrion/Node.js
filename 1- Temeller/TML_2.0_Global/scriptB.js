// tarayıcı 
// window (global)
// window objesi bütün verileri içinde taşır.


// var lastName = "Turan";
// console.log(firstName);
// console.log(lastName);
// console.log(window);

// window.console.log();
// window.setInterval;
// window.setTimeout;
// window.clearInterval;

// nodejs
// global (window)
// Bütün verileri getirir lakin normal değişkenleri ele almaz ek olarak global yazılması gerekir.

var lastName = "Turan";
// global.lastName = "Turans"; Bu şekilde yazılması gerekir

console.log(global.lastName); // Çalışmaz.

// global.setTimeout(() => {
    
// }, timeout);

console.log(global);