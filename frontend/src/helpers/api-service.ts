import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ApiService {
    http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    get(
        route: string,
        action: (data: any) => void,
        errorFn: (err: string) => void = alert
    ): void {
        this.http
            .get<any>(
                environment.API_BASE_URL + route,
                httpOptions
            )
            .pipe(catchError(handleError))
            .subscribe(action, errorFn);
    }

    post(
        route: string,
        action: (data: any) => void,
        errorFn: (err: string) => void = alert,
        params: any = {}
    ): void {
        this.http
            .post<any>(
                environment.API_BASE_URL + route,
                params,
                httpOptions
            )
            .pipe(catchError(handleError))
            .subscribe(action, errorFn);
    }
}
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.API_BASE_URL,
    }),
    withCredentials: true,
};
const handleError = (
    error: HttpErrorResponse
): ObservableInput<any> => {
    let errorMessage: string;
    if (error.status === 0) {
        errorMessage = `Error: ${error.message}`;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(errorMessage);
};
