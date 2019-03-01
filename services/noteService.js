let dbConn=require('./db');

dbConn.con(function(){

    module.exports.get= function getNote(req, res) {
    dbConn.db.collection('notes').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
        });
    };

    module.exports.search=function searchNote(req, res) {
    let data=parseInt(req.params.noteId);
    dbConn.db.collection('notes').findOne({noteId: data}, (err, result)=> {
        if (err) return console.log(err);
        res.send(result)
        });
    };

    module.exports.add=function addNote(data) {
    dbConn.db.collection('notes').insertOne(data, (err) => {
        if (err) return console.log(err);
        console.log('saved to database ');
        });
    };

    module.exports.edit=function editNote(req, res) {
    let id=parseInt(req.params.noteId);
    dbConn.db.collection('notes')
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
    };

    module.exports.delete=function deleteNote(req, res) {
    let id=parseInt(req.params.noteId);
    dbConn.db.collection('notes').findOneAndDelete({noteId: id}, (err, result) => {
        if (err) return res.send(500, err);
        res.send(result);
        });
    };

});

