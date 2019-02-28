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
    let data=parseInt(req.params.noteId);
    dbConn.collection('notes').findOne({noteId: data}, (err, result)=> {
        if (err) return console.log(err);
        res.send(result)
    });


}

function addNote(data) {
    dbConn.collection('notes').insertOne(data, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database ');
    });
}

function editNote(req, res) {
    let id=parseInt(req.params.noteId);
    dbConn.collection('notes')
        .findOneAndUpdate({noteId: id}, {
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
    let id=parseInt(req.params.noteId);
    dbConn.collection('notes').findOneAndDelete({noteId: id}, (err, result) => {
        if (err) return res.send(500, err);
        res.send(result);
    });
}

module.exports = {
    get: getNote,
    add: addNote,
    edit: editNote,
    search: searchNote,
    delete: deleteNote
};


