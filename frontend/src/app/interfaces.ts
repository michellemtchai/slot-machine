export interface RollResult {
    inSession: boolean;
    blocks: Array<string>;
    credit: number;
}
export interface GameEnd {
    inSession: boolean;
    message: string;
}
