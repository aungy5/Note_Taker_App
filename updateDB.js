//function to update the DB 
function updateDatabase() {
    fs.readFile('/Users/andrew/Note_Taker_App/Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(notes)
            fs.writeFile('/Users/andrew/Note_Taker_App/Develop/db/db.json', JSON.stringify(notes), err => {
                if (err) throw err;
                return true;
            });
        }
    })
}