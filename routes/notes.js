const router= require('express').Router();
const {readFromFile, readAndAppend,writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
let db = require('../db/db.json')
const fs = require('fs');

router.get('/',(req,res)=>{
    readFromFile('./db/db.json').then((data)=>res.json(JSON.parse(data)));
});

router.post('/', (req,res)=>{
    console.log(req.body)

    const {title, text} = req.body

    if(req.body) {
        const newNote = {
            title,
            text,
            id:uuid()
        }
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfuly');
    }else{
        res.error('Error in adding Note')
    }
});
// localhost:3001/api/notes/:id (req.params.id)
router.delete('/:id', (req,res)=>{
    db = JSON.parse(fs.readFileSync("./db/db.json", "utf8")) 
    console.log(db)
let notesToKeep = [];


    for(let i = 0; i < db.length; i++){
        if(db[i].id !== req.params.id){
            notesToKeep.push(db[i])

        }
    }
    db = notesToKeep;
    fs.writeFileSync('./db/db.json', JSON.stringify(db), (err)=>{
        if (err) throw err
    })
    res.json(db)
})


module.exports = router;

