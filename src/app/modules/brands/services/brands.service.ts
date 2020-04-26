import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Brand } from 'src/app/interfaces/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(
    private _http: HttpClient
  ) { }

  getBrands() {
    return this._http.get<Brand[]>(`${environment.API}brand`).pipe(
      take(1)
    )
  }
}
