const chai = require('chai');
const testAPI = require('../helpers/test.api');
const assert = chai.assert;
const apiRoute = {
    start: '/game/start',
    play: '/game/play',
    cashout: '/game/cashout',
};

describe('Integration tests for game controller', () => {
    describe(`GET ${apiRoute.start}`, () => {
        it(`${apiRoute.start}`, (done) => {
            testAPI.getRoute(
                apiRoute.start,
                done,
                (err, res) => {
                    //TODO
                }
            );
        });
    });

    describe(`POST ${apiRoute.play}`, () => {
        it(`${apiRoute.play}`, (done) => {
            testAPI.getRoute(apiRoute.play, done, (err, res) => {
                //TODO
            });
        });
    });

    describe(`POST ${apiRoute.cashout}`, () => {
        it(`${apiRoute.cashout}`, (done) => {
            testAPI.getRoute(
                apiRoute.cashout,
                done,
                (err, res) => {
                    //TODO
                }
            );
        });
    });
});
