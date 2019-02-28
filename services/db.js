/*let MongoClient = require('mongodb').MongoClient;
let dbConn='';
let url = 'mongodb://localhost:27017';

MongoClient.connect(url)
    .then((client)=> {
        dbConn=client.db('note');
        console.log('Connected to DB');
    })
    .catch( (err)=> {
        console.log(err);
    });

let c=dbConn.collection('note');
module.exports = {
    db:c
};
*/
