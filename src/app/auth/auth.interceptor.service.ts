import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
// This service is used to intercept the HTTP requests and add the token to the request headers
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // take operation is intrested in only 1 value emmited from observable after that it won't check for new value
        // exhautMap is used to return another type of observable from the o/p of the fisrt observable
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {

                if(!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({ params: req.params.set('auth', user.token) });
                return next.handle(modifiedReq);
            })
        );
    }
}