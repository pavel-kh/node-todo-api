/* global describe it beforeEach */
const expect = require('expect');
const request = require('supertest');

const { app } = require('./../../server/server');
const { Todo } = require('./../modules/todo');
const { ObjectID } = require('mongodb');




const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});
describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'Buy milk';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should not create todo with invalid body', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            });
    });


});

describe('GET /todos', () => {

    it('should fetch all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return valid todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })).end(done);
    });
    it('should return 404 if todo not found', (done) => {
        var objectId = new ObjectID();

        request(app)
            .get(`/todos/${objectId.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for not object ids', (done) => {
        request(app)
            .get('/todos/1')
            .expect(404)
            .end(done);
    });
});