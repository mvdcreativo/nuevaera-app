import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginate, Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';
import { filter, map, take } from 'rxjs/operators';

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


  public getProductByBrand(brand) : Observable<Product[]>{
    return this._http.get<Product[]>(`${environment.API}brand-by-slug/${brand}`).pipe(
      map( x => x.filter( v=> v.status !== "DIS"))
    )
  }

  public getProductByCategory(category) : Observable<Product[]> {

    return this._http.get<Product[]>(`${environment.API}category-by-slug/${category}`).pipe(
      map( x => x.filter( v=> v.status !== "DIS"))
    )
  }

  public getProductByCategoryPaginate(category,page)  : Observable<Paginate> {

    return this._http.get<Paginate>(`${environment.API}product-by-category/${category}?page=${page}`).pipe(
      map( x => {
        x.data.filter( v=> v.status !== "DIS")
        return x
      })
    )
  }
  
  public getProductByBrandPaginate(brand,page) : Observable<Paginate> {

    return this._http.get<Paginate>(`${environment.API}product-by-brand/${brand}?page=${page}`).pipe(
      map( x => {
        x.data.filter( v=> v.status !== "DIS")
        return x
      })
    )
  }

  //////SEARCHER/////
  public searchProduct(data: any, page) : Observable<Paginate> {
    
    return this._http.get<Paginate>(`${environment.API}search-paginate/${data}?page=${page}`).pipe(
      map( x => {
        x.data.filter( v=> v.status !== "DIS")
        return x
      })
    )
    // return this.products.find(product=> product.id === id);

    // return this.httpClient.get<Product>(this._url + 'product-' + id + '.json');
  }



}
