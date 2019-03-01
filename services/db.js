let MongoClient = require('mongodb').MongoClient;
let dbConn='';
let url = 'mongodb://localhost:27017';

module.exports.con=function connect(callback){
     MongoClient.connect(url,{useNewUrlParser: true } )
         .then((client)=> {
             dbConn=client.db('note');
             module.exports.db=dbConn;
             callback();
             console.log('Connected to DB');
         })
         .catch( (err)=> {
             console.log(err);
         });
        };




