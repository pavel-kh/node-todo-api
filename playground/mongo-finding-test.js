const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to Mongodb server');
    }
    //
    // db.collection('Users').insertOne({
    //     name: 'Pavel',
    //     age: 27,
    //     location: 'Israel'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log('Inserted user ', result.ops);
    // });


    db.collection('Users').find({name: 'Pavel'}).count().then((count) => {
        console.log(`There are ${count} people with name Pavel`)
    },(err)=>{
        console.log('Unable to count');
    });

   // db.close();
});