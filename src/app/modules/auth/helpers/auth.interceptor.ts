import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getStorage, setStorage, removeStorage } from "src/app/shared/storage/services/storage.service";
import { AuthService } from '../auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = req.url.split('/');
        const apiUrl: Array<any> = environment.AuthAPI.split('/');
        // console.log(apiUrl);
        // console.log(requestUrl);

        let accderUrl = `${environment.API}auth/login`;
        let register = `${environment.API}auth/signup`;
        // console.log(accderUrl);
        // console.log(req.url);


        if (requestUrl[2] === apiUrl[2]
            // && requestUrl[4] === apiUrl[4]
            && req.url !== accderUrl
            && req.url !== register) {
            // console.log();


                const user = this.authService.currentUserValue

                if (user) {
                    const token = user.token;

                    // console.log(token);
                    if (token) {
                        // console.log(token)
                        const headers = req.headers
                            .set('Authorization', `Bearer ${token}`);
                        const authReq = req.clone({ headers });
                        return next.handle(authReq);
                    }else{
                        return next.handle(req);
                    }
                } else {
                    return next.handle(req);
                }
            

        } else {
            return next.handle(req);
        }
        
        
        
    }
}