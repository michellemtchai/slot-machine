const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

module.exports = testLogic = {
    percentTrue: (percent, iterations, action) => {
        let sum = 0;
        for (let i = 0; i < iterations; i++) {
            if (action(percent)) {
                sum += 1;
            }
        }
        return (sum / iterations) * 100;
    },
    stubRollSlots: (gameLogic) => {
        sinon.replace(gameLogic, 'rollSlots', () => {
            return { original: false };
        });
    },
    stubReroll: (gameLogic) => {
        sinon.replace(
            gameLogic,
            'reroll',
            (rollResult, percent) => {
                return percent;
            }
        );
    },
};
