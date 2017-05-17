// ref http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WRzPgLwrLMV
const express = require('express')
var bodyParser = require('body-parser')

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/playground';
var db = pgp(connectionString);

function getTodos(req, res, next) {
  db.any('select * from todo')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL todos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createTodo(req, res, next) {
  db.none('insert into todo(text, complete)' +
      'values(${text}, ${complete})',
    { text: req.body.text, complete: req.body.complete || false })
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
});

app.get('/api/v1/todos', getTodos);
app.post('/api/v1/todos', createTodo);

