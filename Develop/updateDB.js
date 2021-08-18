//function to update the DB 
function updateDB() {
    fs.writeFile('db/db.json',JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
    });
}