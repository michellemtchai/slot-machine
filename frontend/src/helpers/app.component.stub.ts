import { of, throwError, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RollResult } from './interfaces';

export const ERROR_MSG = 'ERROR_MSG';
export const alertStub = (spec: any) => {
    spyOn(window, 'alert').and.callFake((text: string) => {
        spec.message = text;
    });
};
export const confirmStub = (spec: any, response: boolean) => {
    spyOn(window, 'confirm').and.callFake(
        (text?: string | undefined) => {
            spec.message = text;
            return response;
        }
    );
};
export const setupGetRouteStub = (
    spec: any,
    result: any,
    error: boolean = false
) => {
    spyOn(spec.component.api, 'get').and.callFake(
        (
            route: string,
            action: (data: any) => void,
            errFn: (data: any) => void
        ) => {
            spec.routeCalled = route;
            if (error) {
                errFn(ERROR_MSG);
            } else {
                action(result);
            }
        }
    );
};
export const setupPostRouteStub = (
    spec: any,
    result: any,
    error: boolean = false
) => {
    spyOn(spec.component.api, 'post').and.callFake(
        (
            route: string,
            action: (data: any) => void,
            errFn: (data: any) => void
        ) => {
            spec.routeCalled = route;
            if (error) {
                errFn(ERROR_MSG);
            } else {
                action(result);
            }
        }
    );
};
// export const setTimeoutStub = (spec: any) => {
//     spyOn(window, 'setTimeout').and.callFake((action, time) => {
//         spec.changes.push(spec.blocks);
//         spec.times.push(time);
//         spec.numCalled++;
//         action();
//     });
// };
