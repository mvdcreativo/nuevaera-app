import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authService.currentUserValue;
      ///si es loged
      if (currentUser.user.role === "ADM") {
        console.log('Logged');
        
         return true;
      }
      ///no logeado
      console.error('No logeado');
      
      this.router.navigate(['/acceder'], { queryParams: { returnUrl: state.url } });
      return false;
  }
  
}
