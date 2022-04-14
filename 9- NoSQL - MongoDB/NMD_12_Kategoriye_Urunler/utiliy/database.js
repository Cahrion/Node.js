const mongodb       = require("mongodb");
const MongoClient   = mongodb.MongoClient;

let _db;

const mongoConnect  = (callback)=>{
    // MongoClient.connect("mongodb:://localhost/node-app")
    MongoClient.connect("mongodb+srv://icabikirgiz:azIy9QmGgGXLw09i@cluster0.enatg.mongodb.net/node-app?retryWrites=true&w=majority")
        .then(client =>{
            console.log("connected");
            _db = client.db();
            callback(client);
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
}

const getdb = ()=>{
    if(_db){
        return _db;
    }
    throw "No Database";
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;