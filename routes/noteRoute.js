const express = require('express');
const noteRouter = express.Router();
const noteService= require('../services/noteService');


noteRouter.get('/', (req, res) => {
    noteService.get(req,res);
    console.log(res);
});

noteRouter.get('/:noteId',  (req, res)=> {
    console.log(req.body.noteId);
    noteService.search(req, res);
});



noteRouter.post('/',  (req, res)=> {
    const noteData={
        noteId:req.body.noteId,
        noteTitle: req.body.noteTitle,
        note: req.body.note,
        noteCreatedDate: req.body.noteCreatedDate
    };
    noteService.add(noteData);
});


noteRouter.put('/:noteId', (req, res)=> {
    noteService.edit(req,res);
});


noteRouter.delete('/:noteId',  (req, res)=> {
    noteService.delete(req,res);
});

module.exports = noteRouter;

