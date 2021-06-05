const app = require('../server');
const emptyFunction = () => {};

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

module.exports = testAPI = {
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
    gameStartedAction: (
        apiRoute,
        user,
        method,
        route,
        done,
        action
    ) => {
        testAPI.getRoute(
            apiRoute.start,
            emptyFunction,
            user,
            () => {
                testAPI[method](
                    apiRoute[route],
                    done,
                    user,
                    action
                );
            }
        );
    },
    gameEndedAction: (
        apiRoute,
        user,
        method,
        route,
        done,
        action
    ) => {
        testAPI.getRoute(
            apiRoute.start,
            emptyFunction,
            user,
            () => {
                testAPI.postRoute(
                    apiRoute.cashout,
                    emptyFunction,
                    user,
                    () => {
                        testAPI[method](
                            apiRoute[route],
                            done,
                            user,
                            action
                        );
                    }
                );
            }
        );
    },
};
