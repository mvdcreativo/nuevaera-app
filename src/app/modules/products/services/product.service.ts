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
  public getProduct(id): Observable<Product> {
    return this._http.get<Product>(`${environment.API}product/${id}`).pipe(
      take(1)
    )
  }


  public getProductByBrand(brand){
    return this._http.get<Product[]>(`${environment.API}brand-by-slug/${brand}`)
  }

  public getProductByCategory(category) {

    return this._http.get<Product[]>(`${environment.API}category-by-slug/${category}`)
  }

  public getProductByCategoryPaginate(category,page) {

    return this._http.get<Product[]>(`${environment.API}product-by-category/${category}?page=${page}`)
  }
  
  public getProductByBrandPaginate(brand,page) {

    return this._http.get<Product[]>(`${environment.API}product-by-brand/${brand}?page=${page}`)
  }

  //////SEARCHER/////
  public searchProduct(data: any) {

    return this._http.get<Product[]>(`${environment.API}search`, data).pipe(
      take(1)
    )
    // return this.products.find(product=> product.id === id);

    // return this.httpClient.get<Product>(this._url + 'product-' + id + '.json');
  }



}
