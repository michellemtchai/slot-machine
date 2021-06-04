export interface RollResult {
    inSession: boolean;
    blocks: Array<string>;
    credit: number;
}
export interface GameEnd {
    inSession: boolean;
    message: string;
}
export interface Dimension {
    width: number;
    height: number;
}
export interface Coordinate {
    x: number;
    y: number;
}
