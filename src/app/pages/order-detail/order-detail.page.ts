import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modules/payment/interfaces/cart-item';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from 'src/app/modules/orders/services/order.service';
import { Order } from 'src/app/modules/orders/interfaces/order';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
    public cartItems : Observable<CartItem[]> = of([]);
    public shoppingCartItems  : CartItem[] = [];
    urlFiles: string = environment.urlFiles;
  
    public order: Observable<Order>;
  
    constructor(
      private cartService: CartService,
      public actionSheetController: ActionSheetController,
      public activateRouter: ActivatedRoute,
      private orderService : OrderService
    ) { }
  
    ngOnInit() {

      this.activateRouter.paramMap.subscribe(
        (param:Params) => {
          const id = param.params.idOrder
          this.order = this.orderService.getOrder(id)

        }
        
      )

      // this.cartItems = this.cartService.getItems();
      // this.cartItems.subscribe(shoppingCartItems => {
      //   console.log(shoppingCartItems);
        
      //   return this.shoppingCartItems = shoppingCartItems;
      // });
  
    }



    repetir(){
      this.order.pipe(take(1)).subscribe(
        order => {
          const product = order.productos.map(
            p => this.cartService.addToCart(p , p.pivot.quantity)
          )
        }
        
      )
      
      // this.cartService.addToCart
    }
}
