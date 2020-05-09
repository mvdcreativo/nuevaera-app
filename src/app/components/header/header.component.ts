import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { CartItem } from 'src/app/modules/payment/interfaces/cart-item';
import { IonSearchbar } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input()backButton: boolean = true;

  carItems : CartItem []= []
  constructor(
    private cartService : CartService,
    private router: Router
  ) {
    this.cartService.getItems().subscribe(items => this.carItems = items);
  }

  ngOnInit() {}



  search(e:CustomEvent){
    console.log(e.detail.value);
    const data = {buscando: e.detail.value};
    this.router.navigate(['/list'], { queryParams: data });
    
  }
}
