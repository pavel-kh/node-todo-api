var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


//mongoose.connect('mongodb://admin:admin@ds141657.mlab.com:41657/todo-app');

mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };