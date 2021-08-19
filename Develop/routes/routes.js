const fs = require("fs");
const path = require("path");
const uuid = require('/Users/andrew/Note_Taker_App/Develop/public/assets/helpers/uuid.js');

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

    app.post('/api/notes', (req, res) => {
        console.info(`${req.method} request received to add a note!`);
        console.log(req.body)
        const { title, text } = req.body;

        if (title && text) {
        const addNote = {
        title,
        text,
        id: uuid(),
      };
      fs.readFile('/Users/andrew/Note_Taker_App/Develop/db/db.json', 'utf8', (err, data) => {
          if (err) {
              console.log(err);
          } else {
              notes.push(addNote)
              fs.writeFile('/Users/andrew/Note_Taker_App/Develop/db/db.json', JSON.stringify(notes), (writeErr) => {
                  writeErr ? console.err(writeErr)
                  : console.info('Successfully updated reviews!')
              })
          }
      });
      const response = {
          status: 'success',
          body: addNote,
      };

      console.log(response);
      res.json(response);
    } else {
        res.json('Error posting note :(')
    }
    });

    // GET request to retrieve a note with a specific ID
    app.get('/api/notes/:id', (req, res) => {
        res.json(notes[req.params.id]);
        console.log(res)
    })

    // DELETE request to delete /* · */a note with a specific ID
    app.delete('/api/notes/:id', (req, res) => {
        console.info(`${req.method} request received to delete a note!`);
        console.log(req.body)
        const { title, text, id } = req.body;

        if (typeof req.params.id != "") {
        const deleteNote = {
        title,
        text,
        id,
      };
      fs.readFile('/Users/andrew/Note_Taker_App/Develop/db/db.json', 'utf8', (err, data) => {
          if (err) {
              console.log(err);
          } else {
              notes.splice(deleteNote.id, 1)
              fs.writeFile('/Users/andrew/Note_Taker_App/Develop/db/db.json', JSON.stringify(notes), (writeErr) => {
                  writeErr ? console.err(writeErr)
                  : console.info(`Successfully deleted note with ID = ${deleteNote.id}`)
              })
          }
      });
      const response = {
          status: 'success',
          body: deleteNote,
      };

      console.log(response);
      res.json(response);
    } else {
        res.json('Error deleting note :(')
    }
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

});

}