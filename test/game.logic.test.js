const game = require('../helpers/game');
const gameLogic = require('../helpers/game.logic');
const testLogic = require('../helpers/test.logic');
const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const numRepeat = 20;
const winningCombo = {
    C: ['C', 'C', 'C'],
    L: ['L', 'L', 'L'],
    O: ['O', 'O', 'O'],
    W: ['W', 'W', 'W'],
};

describe('Integration tests for game logic', () => {
    describe('getRandomInt', () => {
        it('always return a number, where 0 <= x < max', (done) => {
            for (let i = 2; i < numRepeat; i++) {
                gameLogic
                    .getRandomInt(i + 1)
                    .should.be.a('number')
                    .be.within(0, i);
            }
            done();
        });
    });
    describe('hasPercentChance', () => {
        it('returns true at approximately the given percent over multiple iterations', (done) => {
            let sampleSize = 10000;
            let offset = 2;
            for (let percent = 1; percent <= 100; percent++) {
                testLogic
                    .percentTrue(
                        percent,
                        sampleSize,
                        gameLogic.hasPercentChance
                    )
                    .should.be.closeTo(percent, offset);
            }
            done();
        });
    });
    describe('rollOnce', () => {
        it('always return "C", "L", "O", or "W"', (done) => {
            for (let i = 0; i < numRepeat; i++) {
                gameLogic
                    .rollOnce()
                    .should.be.a('string')
                    .be.oneOf(game.SYMBOLS);
            }
            done();
        });
    });
    describe('rollSlots', () => {
        it('returns an object with keys: won, result, where result is a string array with length 3', (done) => {
            let res = gameLogic.rollSlots();
            res.should.have.property('won').be.a('boolean');
            res.should.have.property('result').be.a('array');
            res.result.length.should.eq(3);
            res.result.forEach((entry) => {
                entry.should.be.a('string');
                entry.should.be.oneOf(game.SYMBOLS);
            });
            done();
        });
        it('always return an object where "won" correctly evaluates "result"', (done) => {
            for (let i = 0; i < numRepeat; i++) {
                let res = gameLogic.rollSlots();
                if (res.won) {
                    res.result.should.eql(
                        winningCombo[res.result[0]]
                    );
                } else {
                    res.result.should.not.eql(
                        winningCombo[res.result[0]]
                    );
                }
            }
            done();
        });
    });
    describe('reroll', () => {
        before(() => {
            testLogic.stubRollSlots(gameLogic);
        });
        after(() => {
            sinon.restore();
        });
        describe('when roll result has won=true', () => {
            it('returns newly roll result at approximately given percent of times', (done) => {
                let sampleSize = 10000;
                let offset = 2;
                for (
                    let percent = 1;
                    percent <= 100;
                    percent++
                ) {
                    let action = () =>
                        !gameLogic.reroll(
                            { won: true, original: true },
                            percent
                        ).original;
                    testLogic
                        .percentTrue(percent, sampleSize, action)
                        .should.be.closeTo(percent, offset);
                }
                done();
            });
        });
        describe('when roll result has won=false', () => {
            it('always returns original roll result', (done) => {
                for (let percent = 0; percent < 100; percent++) {
                    let res = gameLogic.reroll(
                        { won: false, original: true },
                        percent
                    );
                    res.original.should.eql(true);
                }
                done();
            });
        });
    });
    describe('gameResults', () => {
        before(() => {
            testLogic.stubReroll(gameLogic);
        });
        after(() => {
            sinon.restore();
        });
        describe('when credit < 40', () => {
            it('returns roll result', (done) => {
                for (let credit = 0; credit < 40; credit++) {
                    let res = gameLogic.gameResult(credit);
                    res.should.have
                        .property('won')
                        .be.a('boolean');
                    res.should.have
                        .property('result')
                        .be.a('array');
                    res.result.length.should.eql(3);
                    res.result.forEach((entry) => {
                        entry.should.be.a('string');
                        entry.should.be.oneOf(game.SYMBOLS);
                    });
                }
                done();
            });
        });
        describe('when 40 >= credit >= 60', () => {
            it('returns rerolled result 40% of times', (done) => {
                for (let credit = 40; credit <= 60; credit++) {
                    gameLogic.gameResult(credit).should.eql(40);
                }
                done();
            });
        });
        describe('when credit > 60', () => {
            it('returns rerolled result 60% of times', (done) => {
                for (let credit = 61; credit <= 100; credit++) {
                    gameLogic.gameResult(credit).should.eql(60);
                }
                done();
            });
        });
    });
    describe('calculateCredit', () => {
        let credit;
        beforeEach((done) => {
            credit = 10;
            done();
        });
        describe('when credit=10, won=true', () => {
            describe('and blockValue="C"', () => {
                it('should return 20', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'C', true)
                        .should.eql(20);
                    done();
                });
            });
            describe('and blockValue="L"', () => {
                it('should return 30', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'L', true)
                        .should.eql(30);
                    done();
                });
            });
            describe('and blockValue="O"', () => {
                it('should return 40', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'O', true)
                        .should.eql(40);
                    done();
                });
            });
            describe('and blockValue="W"', () => {
                it('should return 50', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'W', true)
                        .should.eql(50);
                    done();
                });
            });
        });
        describe('when credit=10, won=false', () => {
            describe('and blockValue="C"', () => {
                it('should return 9', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'C', false)
                        .should.eql(9);
                    done();
                });
            });
            describe('and blockValue="L"', () => {
                it('should return 9', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'L', false)
                        .should.eql(9);
                    done();
                });
            });
            describe('and blockValue="O"', () => {
                it('should return 9', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'O', false)
                        .should.eql(9);
                    done();
                });
            });
            describe('and blockValue="W"', () => {
                it('should return 9', (done) => {
                    gameLogic
                        .calculateCredit(credit, 'W', false)
                        .should.eql(9);
                    done();
                });
            });
        });
    });
});
