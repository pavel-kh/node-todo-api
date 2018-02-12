var { Todo } = require('./modules/todo');
// var { User } = require('./modules/user');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send(e);
    });

});

app.listen(3000, () => {
    console.log('App started on port 3000');
});

module.exports = { app };