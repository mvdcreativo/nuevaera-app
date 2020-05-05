import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/modules/payment/interfaces/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
})
export class CartButtonComponent implements OnInit {
@Input()itemsCart:CartItem[]
  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  onClick(){
    this.router.navigate(['/cart'])
  }

}
