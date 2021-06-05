const game = require('./game');

module.exports = gameLogic = {
    getRandomInt: (max) => {
        return Math.floor(Math.random() * max);
    },
    hasPercentChance: (percent) => {
        let randVal = gameLogic.getRandomInt(100);
        return randVal < percent;
    },
    rollOnce: () => {
        let index = gameLogic.getRandomInt(game.SYMBOLS.length);
        return game.SYMBOLS[index];
    },
    rollSlots: () => {
        let result = [];
        let firstSymbol = null;
        let won = true;
        for (let i = 0; i < game.NUM_ROLLS; i++) {
            let value = gameLogic.rollOnce();
            result.push(value);
            if (i === 0) {
                firstSymbol = value;
            } else {
                if (value !== firstSymbol) {
                    won = false;
                }
            }
        }
        return {
            won,
            result,
        };
    },
    reroll: (rollResult, percent) => {
        let { won } = rollResult;
        if (won) {
            if (gameLogic.hasPercentChance(percent)) {
                return gameLogic.rollSlots();
            } else {
                return rollResult;
            }
        } else {
            return rollResult;
        }
    },
    gameResult: (credit) => {
        let rollResult = gameLogic.rollSlots();
        if (credit < 40) {
            return rollResult;
        } else if (credit >= 40 && credit <= 60) {
            return gameLogic.reroll(rollResult, 40);
        } else {
            return gameLogic.reroll(rollResult, 60);
        }
    },
    calculateCredit: (credit, value, won) => {
        let creditDiff = won ? game.CREDIT_MAPPING[value] : -1;
        return credit + creditDiff;
    },
};
