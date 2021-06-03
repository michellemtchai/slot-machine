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
    get(http: HttpClient, route: string): Observable<any> {
        return http
            .get<any>(
                environment.API_BASE_URL + route,
                httpOptions
            )
            .pipe(catchError(handleError));
    },
    post(
        http: HttpClient,
        route: string,
        params: any = {}
    ): Observable<any> {
        return http
            .post<any>(
                environment.API_BASE_URL + route,
                params,
                httpOptions
            )
            .pipe(catchError(handleError));
    },
};
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.API_BASE_URL,
        'Access-Control-Allow-Credentials': 'true',
    }),
    withCredentials: true,
};
const handleError = (
    error: HttpErrorResponse
): ObservableInput<any> => {
    let errorMessage: string;
    if (error.status === 0) {
        errorMessage = `An error occurred: ${error.error}`;
    } else {
        errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(errorMessage);
};
