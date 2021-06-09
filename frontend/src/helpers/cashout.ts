import { Dimension, Coordinate } from './interfaces';

export const cashout = {
    availableMoves: (
        button: Dimension,
        position: Coordinate,
        screen: Dimension,
        distance: number
    ) => {
        let validMoves = new Array<Coordinate>();
        allMoves.forEach((move) => {
            let newPos = coord(
                position.x + move.x * distance,
                position.y + move.y * distance
            );
            if (
                cashout.validPosition(
                    newPos.x,
                    button.width,
                    screen.width
                ) &&
                cashout.validPosition(
                    newPos.y,
                    button.height,
                    screen.height
                )
            ) {
                validMoves.push(newPos);
            }
        });
        return validMoves;
    },
    getRandomNewCoord: (moves: Array<Coordinate>) => {
        let index = cashout.getRandomInt(moves.length);
        return moves[index];
    },
    hasPercentChance: (percent: number) => {
        let randVal = cashout.getRandomInt(100);
        return randVal < percent;
    },
    getRandomInt: (max: number) => {
        return Math.floor(Math.random() * max);
    },
    validPosition: (
        value: number,
        offset: number,
        max: number
    ) => {
        return value >= 0 && value + offset <= max;
    },
};
export const coord = (x: number, y: number): Coordinate => {
    return {
        x: x,
        y: y,
    };
};
export const dimensions = (
    width: number,
    height: number
): Dimension => {
    return {
        width: width,
        height: height,
    };
};
export const allMoves = [
    coord(1, 0),
    coord(0, 1),
    coord(-1, 0),
    coord(0, -1),
];
