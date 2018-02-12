var { mongoose } = require('./db/mongoose');
var { Todo } = require('./modules/todo');
var { User } = require('./modules/user');
var bodyParser = require('body-parser');
const express = require('express');
var app = express();
app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);

    });
});


app.listen(3000, () => {
    console.log('App started on port 3000');

});

module.exports = { app };