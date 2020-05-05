import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { removeStorage } from "src/app/shared/storage/services/storage.service";

import { AuthService } from '../auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log();
        
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authService.logout();
                if(err.error.message === "Unauthorized"){
                    this.authService.errorSubject.next('Usuario o contraseña incorrectos')
                    console.log('Usuario o contraseña incorrectos');
                }
                removeStorage('currentUser')
            }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authService.logout();
                if(err.error.message === "Unauthorized"){
                    this.authService.errorSubject.next('Usuario o contraseña incorrectos')
                    console.log('Usuario o contraseña incorrectos');
                }
                removeStorage('currentUser')
            }
            if (err.status === 422) {
                // auto logout if 401 response returned from api
                // this.authService.logout();
                if(err.error.errors){
                    const error = err.error.errors
                    if(error.email && error.email[0] === "The email has already been taken."){
                        this.authService.errorSubject.next('El usuario ya existe')
                        console.log('El usuario ya existe');
                    }
                }
                removeStorage('currentUser')
            }

            const error = err.error.message || err.statusText;
            console.log(error);
            
            return throwError(error);

        }))
    }
}