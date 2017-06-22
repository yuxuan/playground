// ref http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WRzPgLwrLMV
const express = require('express')
var bodyParser = require('body-parser')
var busboy = require('connect-busboy');
var fs = require('fs');

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.use(busboy());


app.listen(3002, function () {
  console.log('Example app listening on port 3002!')
});

const preflight = (req, res, next) => {
    console.log('ho');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTION");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Max-Age", 1728000);
    res.send();
}

const getTodos = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log('hey');
    res.send('got it');
}

const createTodo = (req, res) => {
    console.log(req.headers);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send('ok1');
        });
    });
    // res.send('ok2');
}

app.get('/api/v1/test', getTodos);
app.post('/api/v1/test', createTodo);
app.options('/api/v1/test', preflight);

