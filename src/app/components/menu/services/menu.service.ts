import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public categorias$ :  BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
  }
  
  
  categories(){
    return this._http.get(`${environment.API}category`).pipe(
      map( 
        (a:any) => {
  
          let filtra= a.filter(
            x => x.status === "ACT"
          )
          this.categorias$.next(filtra)          
          return filtra
  
          
        }
      )
    )
  }
}

