const EventEmitter  = require('events'); // class olarak gelir.

class Logger extends EventEmitter{

    log(message){
        console.log(message);
        this.emit('connection',{id:1, mesaj:"hello"}); 
    }
    
}

module.exports = Logger;