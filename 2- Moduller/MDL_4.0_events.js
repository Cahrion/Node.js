const Logger   = require("./MDL_4.1_events_logger");
const logger   = new Logger();

// listener kayıt et
logger.on("connection", function(args){
    console.log('Baglantı Kuruldu.', args);
});

logger.log("SadikTuran login oldu.");