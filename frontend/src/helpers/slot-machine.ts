import { environment } from '../environments/environment';
export const ROLL_INTERVAL = 1000;
export const MACHINE_ROLLING =
    'The slot machine is still rolling.';
export const CASHING_OUT = 'Cashing out is still in progress.';
export const defaultSlots: Array<string> = new Array<string>(
    'C',
    'L',
    'O'
);
export const busyCheckAction = (
    rolling: boolean,
    cashingOut: boolean,
    action: () => void
) => {
    if (rolling) {
        alert(MACHINE_ROLLING);
    } else if (cashingOut) {
        alert(CASHING_OUT);
    } else {
        action();
    }
};
export const getBlockImage = (block: string): string => {
    switch (block) {
        case 'C':
            return formatFile('cherries');
        case 'L':
            return formatFile('lemon');
        case 'O':
            return formatFile('orange');
        case 'W':
            return formatFile('watermelon');
        default:
            return formatFile('spinner');
    }
};
const formatFile = (name: string) => {
    let prefix = environment.production
        ? environment.APP_PUBLIC_URL
        : '';
    return `${prefix}/assets/${name}.svg`;
};
