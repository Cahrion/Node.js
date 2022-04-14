const mongodb       = require("mongodb");
const MongoClient   = mongodb.MongoClient;

const mongoConnect  = (callback)=>{
    // MongoClient.connect("mongodb:://localhost/node-app")
    MongoClient.connect("mongodb+srv://icabikirgiz:azIy9QmGgGXLw09i@cluster0.enatg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(client =>{
            console.log("connected");
            callback(client);
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
}

module.exports = mongoConnect;