import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponse } from '../model/login-response';

@Injectable({
    providedIn: 'root'
})
export class SocialTokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if (req.url.indexOf('refresh') !== -1) {
        //     return next.handle(req);
        // }

        let token: string;
        token = this.authService.getAccount()?.authToken;
        if (token) {
            console.log('Interceptor works ' + token);
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next.handle(req).pipe(
                catchError(error => {
                    if(error instanceof HttpErrorResponse && (error.status === 403 || error.status === 401)) {
                        console.log("before handling");
                        return this.handleError(req, next);
                    } else {
                        return throwError(error);
                    }
                }));
        }
        console.log('Interceptor doesnt work');
        return next.handle(req);
    }

    private handleError(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap((loginResponse: LoginResponse) => {
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + loginResponse.authToken) });
                return next.handle(req);
            }));
    }
}

export const socialTokenInterceptor = [{ provide: HTTP_INTERCEPTORS, useClass: SocialTokenInterceptor, multi: true }];