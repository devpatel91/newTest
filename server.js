var express = require('express')
let busboy = require('connect-busboy')
var fs = require('fs');
var app = express()
var path = require('path')
var bodyParser = require('body-parser')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/node_modules')); 
app.use(express.static(__dirname + '/public'));

app.use(busboy());

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html')
})

// app.post('/fileUpload', function(req, res) {
//     req.pipe(req.busboy);
//     req.busboy.on('file', function(fieldname, file, filename) {
//         var fstream = fs.createWriteStream('./uploads/' + filename);
//         console.log(file)
//         file.pipe(fstream);
//         fstream.on('close', function() {
//             res.send('upload succeeded!');
//         });
//     });
// });

app.listen(1337, function() {
    console.log('Server listening on 1337.')
})

module.exports = app
