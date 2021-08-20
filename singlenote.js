console.info(`${req.method} request received to pull up a note!`);
        console.log(req.body);
        const noteID = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            const selectedNote = notes[i];
            if (selectedNote.id === noteID) {
                res.json(selectedNote);
                return;
            }
        }
        res.json('NoteID not found :(')