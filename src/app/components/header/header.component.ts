import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { CartItem } from 'src/app/modules/payment/interfaces/cart-item';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input()backButton: boolean = true;

  carItems : CartItem []= []
  constructor(
    private cartService : CartService
  ) {
    this.cartService.getItems().subscribe(items => this.carItems = items);
  }

  ngOnInit() {}

}
