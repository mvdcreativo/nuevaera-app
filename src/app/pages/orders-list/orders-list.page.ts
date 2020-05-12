import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { OrderService } from 'src/app/modules/orders/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
})
export class OrdersListPage implements OnInit {
  public orders: any;

  constructor(
    private cartService : CartService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    const pageSize = {pageSize: "5"}
    this.orderService.getOrders(pageSize).subscribe(
      (res:any)=>{
        this.orders = res.data
        console.log(this.orders);
        
      }
    )
  }


  repetir(productos){
    productos.map(
      p => this.cartService.addToCart(p , p.pivot.quantity)
    )
    
  }

}
