var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


var mongoAdress = 
mongoose.connect('mongodb://admin:admin@ds141657.mlab.com:41657/todo-app');
module.exports = { mongoose };