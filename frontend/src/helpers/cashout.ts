import { Dimension, Coordinate } from './interfaces';

export const availableMoves = (
    button: Dimension,
    position: Coordinate,
    screen: Dimension,
    distance: number
) => {
    let moves = [
        coord(1, 0),
        coord(0, 1),
        coord(-1, 0),
        coord(0, -1),
    ];
    let validMoves = new Array<Coordinate>();
    moves.forEach((move) => {
        let newPos = coord(
            position.x + move.x * distance,
            position.y + move.y * distance
        );
        if (
            validPosition(
                newPos.x,
                button.width,
                screen.width
            ) &&
            validPosition(newPos.y, button.height, screen.height)
        ) {
            validMoves.push(newPos);
        }
    });
    return validMoves;
};

export const getRandomNewCoord = (moves: Array<Coordinate>) => {
    let index = getRandomInt(moves.length);
    let move = moves[index];
    return coord(move.x, move.y);
};

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

export const hasPercentChance = (percent: number) => {
    let randVal = getRandomInt(100);
    return randVal < percent;
};

export const coord = (x: number, y: number): Coordinate => {
    return {
        x: x,
        y: y,
    };
};

const validPosition = (
    value: number,
    offset: number,
    max: number
) => {
    return value >= 0 && value + offset <= max;
};
