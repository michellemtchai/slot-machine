const app = require('../server');
const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const http = require('http');

module.exports = testApi = {
    user: () => {
        return chai.request.agent(app);
    },
    getRoute: (route, done, user, action) => {
        user.get(route).end((err, res) => {
            action(err, res);
            done();
        });
    },
    postRoute: (route, done, user, action, params = {}) => {
        user.post(route)
            .send(params)
            .end((err, res) => {
                action(err, res);
                done();
            });
    },
};
