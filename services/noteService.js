let MongoClient = require('mongodb').MongoClient;
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

function getNote(req, res) {
    dbConn.collection('notes').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
}

function searchNote(req, res) {
    dbConn.collection('notes').findOne({noteId: req.params.noteId}, (err, document)=> {

        if (err) return console.log(err);
        res.send(document)
    });


}

function addNote(data) {
    dbConn.collection('notes').insertOne(data, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database ');
        console.log(result);
    });
}

function editNote(req, res) {
    dbConn.collection('notes')
        .findOneAndUpdate({noteId: req.body.noteId}, {
            $set: {
                noteTitle: req.body.noteTitle,
                note: req.body.note,
                noteCreatedDate: req.body.noteCreatedDate
            }
        }, {
            sort: {_id: -1},
            upsert: false
        }, (err, result) => {
            if (err) return res.send(err);
            res.send(result)
        })
}

function deleteNote(req, res) {
    dbConn.collection('quotes').findOneAndDelete({noteId: req.body.noteId}, (err, result) => {
        if (err) return res.send(500, err);
        console.log(result);
    });
}

module.exports = {
    get: getNote,
    add: addNote,
    edit: editNote,
    search: searchNote,
    delete: deleteNote
};


