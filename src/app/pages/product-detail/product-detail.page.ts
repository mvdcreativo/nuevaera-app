import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { User } from 'src/app/modules/auth/interfaces/user';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product;
  public urlFiles: string = environment.urlFiles;
  user: User;
  
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUserValue?.user

   }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(
      (params:Params) => {
        const id = params.params.id
        this.productService.getProduct(id).subscribe(
          res => this.product = res
           
        )
      }
      
    )
    // console.log(this.product);
  }

    // Add to cart
    public addToCart(product: Product, quantity: number = 1) {

      this.cartService.addToCart(product, quantity);
      console.log(product, quantity);
    }


    calculoDesc(price , descuentoProduct, dUser?){
      const descuentoP = (price * descuentoProduct) / 100;
      const pricePublico = price - descuentoP;
    
      if(dUser){
        const descuentUser = (pricePublico * dUser) / 100;
        return pricePublico - descuentUser;
      }
    
      return pricePublico
    }
  

}
