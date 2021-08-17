const fs = require("fs");
const path = require("path");

module.exports = app => {
    // VIEW ROUTES
    // 1. notes.html will be displayed when "http://localhost:3001/notes" is accessed
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    })
    // 2. index.html will be displayed when any route other than "/notes" is accessed
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });
}