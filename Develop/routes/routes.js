const fs = require("fs");
const path = require("path");

module.exports = app => {
    //setting up a notes variable for easy access
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        console.log(notes);
    

    //GET /api/notes should read the db.json file and return all saved notes as JSON.
    app.get('/api/notes', (req, res) => {
        res.json(notes);
        console.log(`${req.method} request recieved`);
    });

    //POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
    app.post('/api/notes', (req, res) => {
        let addNote = req.body;
        notes.push(addNote);
        updateDB();
        return console.log(`Your note ${addNote.title} was successfully added`);
    });

    // VIEW ROUTES
    // 1. notes.html will be displayed when "http://localhost:3001/notes" is accessed
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    })
    // 2. index.html will be displayed when any route other than "/notes" is accessed
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });

    //function to update the DB 
    function updateDB() {
        fs.writeFile('db/db.json',JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }
});

}