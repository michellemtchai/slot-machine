export const cashout = {
    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    },
    availableMoves(
        x: number,
        y: number,
        screenWidth: number,
        screenHeight: number,
        distance: number
    ) {
        let moves = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
        ];
        let validMoves = new Array<Array<number>>();
        moves.forEach((move) => {
            let [xPos, yPos] = [
                x + move[0] * distance,
                y + move[1] * distance,
            ];
            if (
                validPosition(xPos, screenWidth) &&
                validPosition(yPos, screenHeight)
            ) {
                validMoves.push([xPos, yPos]);
            }
        });
        return validMoves;
    },
    cashoutFailed:
        'Error: Failed to move credit to your account.',
};
const validPosition = (value: number, max: number) => {
    return value >= 0 && value <= max;
};
