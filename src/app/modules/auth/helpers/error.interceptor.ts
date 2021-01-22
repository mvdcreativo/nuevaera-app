import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { removeStorage } from "src/app/shared/storage/services/storage.service";

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
        ) { }
    retryDelay = 500;
    retryMaxAttempts = 1;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
          this.retryAfterDelay(),
        );
    }

    retryAfterDelay(): any {
        return retryWhen(errors => {
            return errors.pipe(
                mergeMap((err, count) => {
                    // throw error when we've retried ${retryMaxAttempts} number of times and still get an error
                    if (err.status === 401) {
                        // auto logout if 401 response returned from api
                        // this.authService.logout();

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

                    if (count === this.retryMaxAttempts) {
                        return throwError(err);
                    }
        
                    return of(err).pipe(
                        tap(error => console.log(`Retrying ${error.url}. Message: ${error.message}. Retry count ${count + 1}`)),
                        mergeMap(() => timer(this.retryDelay))
                    );
                })
            );
        });
    }
}