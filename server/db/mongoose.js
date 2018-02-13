var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


//mongoose.connect('mongodb://admin:admin@ds141657.mlab.com:41657/todo-app');

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };