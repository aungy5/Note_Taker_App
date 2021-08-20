const express = require('express');
const fs = require("fs");
const path = require("path");
const uuid = require("./db/helpers/uuid");
const db = require("./db/db.json")
//const uuid = require('./helpers/uuid');

//const PORT = 3001;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(__dirname));
app.use(express.static('public'));

//require('./routes/routes')(app);

fs.readFile("./db/db.json", 'utf8', (err, data) => {
  if (err) throw err;
  var notes = JSON.parse(data);
  console.log(notes);

//GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  res.json(notes);
  console.log(`${req.method} request received`);
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
fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        notes.push(addNote)
        fs.writeFile("./db/db.json", JSON.stringify(notes), (writeErr) => {
            writeErr ? console.err(writeErr)
            : console.info(`Successfully added your note with ID = ${addNote.id}`)
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

// DELETE request to delete a note with a specific ID
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
fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
      for (let i = 0; i < notes.length; i++) {

          if (notes[i].id == req.params.id) {
              notes.splice(i, 1);
              break;
          }
      }
        
        fs.writeFile("./db/db.json", JSON.stringify(notes), (writeErr) => {
            writeErr ? console.err(writeErr)
            : console.info(`Successfully deleted note with ID = ${req.params.id}`)
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
  res.sendFile(path.join(__dirname, './public/notes.html'))
})
// 2. index.html will be displayed when any route other than "/notes" is accessed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

