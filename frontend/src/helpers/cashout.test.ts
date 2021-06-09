import { Coordinate } from './interfaces';

export const approximately = (
    value: number,
    expected: number,
    offset: number
) => {
    return (
        value >= expected - offset && value <= expected + offset
    );
};

export const containsCoordinate = (
    coordinates: Array<Coordinate>,
    coordinate: Coordinate
) => {
    for (let i = 0; i < coordinates.length; i++) {
        let curr = coordinates[i];
        if (curr.x === coordinate.x && curr.y === coordinate.y) {
            return true;
        }
    }
    return false;
};

export const percentDist = (
    iterations: number,
    moves: Array<Coordinate>,
    action: (moves: Array<Coordinate>) => Coordinate
) => {
    let sums: any = {};
    for (let i = 0; i < iterations; i++) {
        let res = action(moves);
        let key = `${res.x},${res.y}`;
        if (!sums[key]) {
            sums[key] = 1;
        } else {
            sums[key]++;
        }
    }
    return Object.keys(sums).map(
        (key) => (sums[key] / iterations) * 100
    );
};

export const percentTrue = (
    percent: number,
    iterations: number,
    action: (n: number) => boolean
) => {
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
        if (action(percent)) {
            sum += 1;
        }
    }
    return (sum / iterations) * 100;
};
