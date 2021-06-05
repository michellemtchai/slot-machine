const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

module.exports = testApi = {
    getRoute: (route, done, action) => {
        chai.request(server)
            .get(route)
            .end((err, res) => {
                action(err, res);
                done();
            });
    },
    postRoute: (route, done, action, params = {}) => {
        chai.request(server)
            .post(route)
            .send(params)
            .end((err, res) => {
                action(err, res);
                done();
            });
    },
};
