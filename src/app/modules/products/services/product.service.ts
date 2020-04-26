import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient,
    
  ) { }


  
  public getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${environment.API}product`).pipe(
      take(1)
    )
  }
}
