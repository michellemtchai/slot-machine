import { environment } from '../environments/environment';
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
        alert('The slot machine is still rolling.');
    } else if (cashingOut) {
        alert('Cashing out is still in progress.');
    } else {
        action();
    }
};
export const formatFile = (name: string) => {
    let prefix = environment.production
        ? environment.APP_PUBLIC_URL
        : '';
    return `${prefix}/assets/${name}.svg`;
};
