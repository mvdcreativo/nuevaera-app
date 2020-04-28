import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/modules/payment/services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() data;

  public urlFiles: string = environment.urlFiles;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() { }


  onClick(id) {
    this.router.navigate(['/product-detail', id])
  }


  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {

    this.cartService.addToCart(product, quantity);
    console.log(product, quantity);
  }
}
