const express = require("express");
const request = require("supertest-as-promised");
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const util = require("util")
const Utils = require("../src/utils/Utils");

const app = express();
app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

require('../src/todos/routes.js')(app);

// Jest

describe('GET /api/test', () => {
  xit('should return JSON object', () => {
    return request(app).get('/api/test/3')
      // .set('Accept', 'application/json')
      // .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(typeof res.body).toBe('object');
        expect(res.body.message).toBe('Hello World!');
      });
  });
});

describe('GET /api/todos', () => {
  it('should return JSON array', () => {
    return request(app).get('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});


describe('POST,UPDATE,DELETE /api/todo', () => {
  let id = Utils.uuid();
  let isCompleted = false;
  let seconds = 0;
  let status = "Stopped";
  let title = "todo-jest-item";
  let title_updated = "todo-jest-item-updated";

  let todo = {
    id,
    isCompleted,
    seconds,
    status,
    title
  };

  it('should accept and add a valid new item', () => {
    // ADD
    return request(app).post('/api/todo')
      .send(JSON.stringify(todo))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body.title).toBe(title);

        todo = {
          id,
          isCompleted: true,
          seconds,
          status,
          title: title_updated
        };
        
        // UPDATE
        return request(app).put(util.format('/api/todo/%s', id))
          .send(JSON.stringify(todo))
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
      })
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body.isCompleted).toBe(true);
        expect(res.body.title).toBe(title_updated);
        
        // DELETE
        return request(app).delete(util.format('/api/todo/%s/%s', id, title))
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json');
      })
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body.title).toBe(title);
      });
  });

  xit('should update the item', () => {
    todo = {
      id,
      isCompleted: true,
      seconds,
      status,
      title: title_updated
    };

    return request(app).put(util.format('/api/todo/%s', id))
      .send(JSON.stringify(todo))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body.isCompleted).toBe(true);
        expect(res.body.title).toBe(title_updated);
      });
  });

  xit('should delete the item', () => {
    return request(app).delete(util.format('/api/todo/%s/%s', id, title_updated))
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body.title).toBe(title_updated);
      });      
  });
});
