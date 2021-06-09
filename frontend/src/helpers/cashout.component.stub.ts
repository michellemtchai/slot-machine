import { cashout } from './cashout';

export const hasPercentChanceStub = (
    spec: any,
    returnValue: boolean
) => {
    spyOn(cashout, 'hasPercentChance').and.callFake(
        (percent: number) => {
            spec.percent = percent;
            return returnValue;
        }
    );
};
export const unclickableStub = (spec: any) => {
    spyOn(cashout, 'hasPercentChance').and.callFake(
        (percent: number) => {
            spec.percent = percent;
            return percent === 40;
        }
    );
};
