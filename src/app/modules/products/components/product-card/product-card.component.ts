import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/auth/interfaces/user';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() data;

  public urlFiles: string = environment.urlFiles;
  user: User;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUserValue?.user
    // console.log(this.user);
  }

  ngOnInit() { }


  onClick(id) {
    this.router.navigate(['/product-detail', id])
  }


  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {

    this.cartService.addToCart(product, quantity);
    // console.log(product, quantity);
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
