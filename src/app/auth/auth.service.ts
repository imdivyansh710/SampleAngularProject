import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(private http: HttpClient) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsDNKSP-LlX0fDwfJleWTuIk9rxbE-ARw'
            , {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(
                this.handleError
            ))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsDNKSP-LlX0fDwfJleWTuIk9rxbE-ARw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(
                this.handleError
            ))
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occured!"
        console.log(errorRes);
        
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes?.error?.error?.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email exists already!'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This Email was not found!'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct!'
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Login Credentials are not correct!'
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled!'
                break;
        }

        return throwError(errorMessage);
    }

}