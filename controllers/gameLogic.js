module.exports = {
    gameResult: (credit) => {
        let rollResult = rollBlocks();
        if (credit < 40) {
            return rollResult;
        } else if (credit >= 40 && credit <= 60) {
            return reroll(rollResult, 40);
        } else {
            return reroll(rollResult, 60);
        }
    },
    calculateCredit: (credit, value, won) => {
        let creditDiff = won ? CREDIT_MAPPING[value] : -1;
        return credit + creditDiff;
    },
};

// helper functions
const NUM_ROLLS = 3;
const CREDIT_MAPPING = {
    C: 10,
    L: 20,
    O: 30,
    W: 40,
};
const rollBlocks = () => {
    let symbols = Object.keys(CREDIT_MAPPING);
    let rollOnce = () => {
        let index = getRandomInt(symbols.length);
        return symbols[index];
    };
    let result = [];
    let firstSymbol = '';
    let won = true;
    for (let i = 0; i < NUM_ROLLS; i++) {
        let value = rollOnce();
        result.push(value);
        if (i === 0) {
            firstSymbol = value;
        } else {
            if (value !== firstSymbol) {
                won = false;
            }
        }
    }
    return [won, result];
};
const reroll = (rollResult, rerollProb) => {
    let [won, _] = rollResult;
    if (won) {
        let rerollRand = getRandomInt(100);
        if (rerollRand < rerollProb) {
            return rollBlocks();
        } else {
            return rollResult;
        }
    } else {
        return rollResult;
    }
};
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};
