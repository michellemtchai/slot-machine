const game = require('../helpers/game');
const testAPI = require('../helpers/test.api');
const apiRoute = {
    start: '/game/start',
    play: '/game/play',
    cashout: '/game/cashout',
};
const emptyFunction = () => {};
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

describe('Integration tests for game controller', () => {
    let user;
    beforeEach((done) => {
        user = testAPI.user();
        done();
    });
    describe('Test routes', () => {
        describe(`GET ${apiRoute.start}`, () => {
            it('should return a object with credit=10', (done) => {
                testAPI.getRoute(
                    apiRoute.start,
                    done,
                    user,
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have
                            .property('credit')
                            .eql(10);
                    }
                );
            });
        });

        describe(`POST ${apiRoute.play}`, () => {
            describe('when game has not started', () => {
                it('should return inSession=false with a message about having no credit', (done) => {
                    testAPI.postRoute(
                        apiRoute.play,
                        done,
                        user,
                        (_, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('inSession')
                                .eql(false);
                            res.body.should.have
                                .property('message')
                                .eql(game.noCredit);
                        }
                    );
                });
            });
            describe('when game has started', () => {
                it('should return inSession=true with blocks values', (done) => {
                    testAPI.gameStartedAction(
                        apiRoute,
                        user,
                        'postRoute',
                        'play',
                        done,
                        (_, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('inSession')
                                .eql(true);
                            res.body.should.have.property(
                                'blocks'
                            );
                            res.body.blocks.should.be.a('array');
                            res.body.should.have
                                .property('credit')
                                .be.a('number')
                                .not.eql(10);
                            res.body.blocks.length.should.eql(3);
                        }
                    );
                });
            });
            describe('when game has ended', () => {
                it('should return inSession=false with a message about having no credit', (done) => {
                    testAPI.gameEndedAction(
                        apiRoute,
                        user,
                        'postRoute',
                        'play',
                        done,
                        (_, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('inSession')
                                .eql(false);
                            res.body.should.have
                                .property('message')
                                .eql(game.noCredit);
                        }
                    );
                });
            });
        });

        describe(`POST ${apiRoute.cashout}`, () => {
            describe('when game has not started', () => {
                it('should return inSession=false with a message about having no credit', (done) => {
                    testAPI.postRoute(
                        apiRoute.cashout,
                        done,
                        user,
                        (_, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('inSession')
                                .eql(false);
                            res.body.should.have
                                .property('message')
                                .eql(game.noCredit);
                        }
                    );
                });
            });
            describe('when game has started', () => {
                it('should return inSession=false with a message about saved credit', (done) => {
                    testAPI.gameStartedAction(
                        apiRoute,
                        user,
                        'postRoute',
                        'cashout',
                        done,
                        (_, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('inSession')
                                .eql(false);
                            res.body.should.have
                                .property('message')
                                .eql(game.savedCredit(10));
                        }
                    );
                });
            });
        });
    });
});
