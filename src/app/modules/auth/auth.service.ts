import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { User, CurrentUser } from './interfaces/user';
import { Router } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getStorage, setStorage, removeStorage } from "src/app/shared/storage/services/storage.service";

import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';




@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private currentUserSubject: BehaviorSubject<CurrentUser> = new BehaviorSubject(null)
  public currentUser: Observable<CurrentUser>;
  public errorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  public error$: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) {

    getStorage('currentUser').then(
      user => {
        try{
          console.log(user);
          
          this.currentUserSubject.next(user || null)
          if(this.currentUserSubject){
            

          }

        }
        catch(error){
          console.log('ERROR', error);
        }
        
      }
    )
    this.currentUser = this.currentUserSubject.asObservable()
    this.error$ = this.errorSubject.asObservable()

  }

  ngOnInit(){

  }


  public  get currentUserValue(): CurrentUser {
    if (this.currentUserSubject.value && this.currentUserSubject.value.user) {
      // this.actualizaUser(this.currentUserSubject.value.user.id);
    }
    // console.log(this.currentUserSubject);

    return this.currentUserSubject.value;
  }


  public get errorValue(): any {
    return this.errorSubject.value;
  }


  actualizaUser(id) {
    return this.http.get<User>(`${environment.API}auth/users/${id}`).pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        let currenUser: CurrentUser = this.currentUserSubject.value
        currenUser.user = res;
        this.currentUserSubject.next(currenUser)
        setStorage('currentUser',currenUser)


      }

    )
  }

  findUser(id) {
    return this.http.get<User>(`${environment.API}auth/users/${id}`)
  }

  register(credentials: User): Observable<CurrentUser> {
    return this.http.post<any>(`${environment.API}auth/signup`, credentials)
      .pipe(
        map(user => {
          console.log(user);

          // this.router.navigate(['acceder']);
          // console.log(user);
          if (user.user && user.user.token) {
            let message, status;
            message = `Hola!! Gracias por egistrarte ${user.user.user.name} `;
            status = 'toastSuccess';
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 500 });
            console.log(user);

            // store user details ands token in local storage to keep user logged in between page refreshes
            setStorage('currentUser',user.user)
            this.currentUserSubject.next(user.user);
            // this.router.navigate(['admin'])
            // console.log(user);

          }


          return user;
        }),
      );
  }



  login(credentials: User): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${environment.API}auth/login`, credentials)
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details ands token in local storage to keep user logged in between page refreshes
            setStorage('currentUser',user)
            this.currentUserSubject.next(user);

            let message, status;
            message = `Hola de nuevo ${user.user.name}, gracias por preferirnos!`;
            status = 'toastSuccess';
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 500 });
            // this.router.navigate(['admin'])
            // console.log(user);

          }

          return user;
        }),
      );
  }

  logout() {
    console.log('logoutService');

    return this.http.get<any>(`${environment.API}auth/logout`)
      .pipe(
        take(1)
      ).subscribe(res => {
        console.log(res);
        // remove user from local storage to log user out
        removeStorage('cartItem')
        removeStorage('currentUser')
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
      },
        error => {
          removeStorage('cartItem')
          removeStorage('currentUser')
          this.currentUserSubject.next(null);
          this.router.navigate(['/']);
        }

      )


  }


  solicitaResetPass(data) {
    return this.http.post<any>(`${environment.API}password/create`, data)
      .pipe(
        take(1)
      ).subscribe(
        res => {
          console.log(res);
          
          let message, status;
            message = res.message;
            status = 'toastSuccess';
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 500 });
        },
        error => {
          let message, status;
          message = error;
          status = 'toastError';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 500 });
        }
        )
      
  }
  updatePass(data){
    return this.http.post<any>(`${environment.API}password/reset`, data)
    .pipe(
      take(1)
    )
    .subscribe(
      res => {
        console.log(res);
        
        let message, status;
          message = res.message;
          status = 'toastSuccess';
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 500 });
      },
      error => {
        let message, status;
        message = error;
        status = 'toastError';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 500 });
      }
      
    )
  }


user(){
    return this.http.get<User>(`${environment.API}auth/users/${this.currentUserValue.user.id}`).pipe(take(1))
}


 async updateUser(data){
    return this.http.put<User>(`${environment.API}auth/users/${data.id}`, data)
    .pipe(
      map(
        user => {
          let currenUser: CurrentUser = this.currentUserSubject.value
          currenUser.user = user;
          this.currentUserSubject.next(currenUser)
          setStorage('currentUser',currenUser)

          let message, status;
            message = "Actualizado";
            status = 'toastSuccess';
            this.snackBar.open(message, '', { panelClass: [status], verticalPosition: 'top', duration: 500 });
        },
        error => {
          let message, status;
          message = error;
          status = 'toastError';
          this.snackBar.open(message, '', { panelClass: [status], verticalPosition: 'top', duration: 500 });
        }
      )
    )
  }
}
