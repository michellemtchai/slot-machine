import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const api = {
    get(
        http: HttpClient,
        route: string,
        errorFn: (err: string) => void = alert
    ): Observable<any> {
        return http
            .get<any>(
                environment.API_BASE_URL + route,
                httpOptions
            )
            .pipe(
                catchError((e: HttpErrorResponse) =>
                    handleError(e, errorFn)
                )
            );
    },
    post(
        http: HttpClient,
        route: string,
        errorFn: (err: string) => void = alert,
        params: any = {}
    ): Observable<any> {
        return http
            .post<any>(
                environment.API_BASE_URL + route,
                params,
                httpOptions
            )
            .pipe(
                catchError((e: HttpErrorResponse) =>
                    handleError(e, errorFn)
                )
            );
    },
};
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.API_BASE_URL,
    }),
    withCredentials: true,
};
const handleError = (
    error: HttpErrorResponse,
    errorFn: (err: string) => void
): ObservableInput<any> => {
    let errorMessage: string;
    if (error.status === 0) {
        errorMessage = `Error: ${error.error}`;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    errorFn(errorMessage);
    return throwError(errorMessage);
};
