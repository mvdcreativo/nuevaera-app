import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

  products: Product[] = [];
  totalProduct: number = 0;
  currentPage: number = 0;
  lastPage: number = 0;
  category: any;
  brand: any;
  search: any;
  sinResultados: string;
  nextPage: number = 0;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        // console.log(params);

        if (Object.keys(params).length !== 0) {
          // console.log(params);

          this.navegaConParametros(params);

        } else {
          ///Buscador

          this.navegaConQueryParams()
          // console.log(params);


        }
      }
    )

  }



  navegaConParametros(params) {
    if (params['marca']) {
      this.brand = params['marca'];
      this.brands(this.brand);

    } else {
      this.category = params['category'];
      this.categories(this.category);
    }
  }

  navegaConQueryParams() {

    this.route.queryParamMap.subscribe(
      (params: Params) => {
        if (params.params.buscando) {
          // console.log(params.params);
          this.products = []
          this.currentPage = 0

          this.search = params.params.buscando
          this.searcher(this.search)


        } else {
        }
      }
    )
  }



  categories(category) {
    const page = this.currentPage + 1;
    // console.log(page);
    
    this.productService.getProductByCategoryPaginate(category, page).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.agregaDatos(res)
        // this.getTags(products)
        // this.getColors(products)
      })
  }

  brands(brands) {
    const page = this.currentPage + 1
    this.productService.getProductByBrandPaginate(brands, page).subscribe(
      (res: any) => {

        this.agregaDatos(res)

      })
  }

  searcher(params) {
    console.log(params);

    const page = this.currentPage + 1
    this.productService.searchProduct(params, page).subscribe(
      (res: any) => {
        // console.log(res);
        // this.allItems = res
        this.agregaDatos(res)
      }
    )
  }


  private agregaDatos(res) {
    if (res.data.length >= 1) {
      this.products.push(...res.data);
      this.totalProduct = res.total
      this.currentPage = res.current_page
      this.lastPage = res.last_page
      
      // console.log(this.totalProduct);
      // console.log(this.currentPage);
      // console.log(this.lastPage);
      
      if (this.lastPage === this.currentPage) {
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = true
      }
      this.infiniteScroll ? this.infiniteScroll.disabled = false : null
      this.infiniteScroll ? this.infiniteScroll.complete() : null;
      this.sinResultados = null
    } else {
      this.sinResultados = "No hay productos"
    }

  }



  loadData(e) {
    if (this.category) {
      this.categories(this.category)
    }
    if (this.brand) {
      this.brands(this.brand)
    }
    if (this.search) {
      this.searcher(this.search)
    }

  }

}
