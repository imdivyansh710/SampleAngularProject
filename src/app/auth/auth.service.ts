import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

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

    //give access to previously emiited value, we have to pass some initial value also here
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsDNKSP-LlX0fDwfJleWTuIk9rxbE-ARw'
            , {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(
                this.handleError
            ), tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken, 
                    +resData.expiresIn);
            }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsDNKSP-LlX0fDwfJleWTuIk9rxbE-ARw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(
                this.handleError
            ), tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken, 
                    +resData.expiresIn);
            }))
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
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