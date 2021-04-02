import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { OrderService } from 'src/app/modules/orders/services/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
  providers: [DatePipe]
})
export class OrdersListPage implements OnInit {
  public orders: any[];
  noResult: string;

  constructor(
    private cartService : CartService,
    private orderService: OrderService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    const pageSize = {pageSize: "10"}
    this.orderService.getOrders(pageSize).subscribe(
      (res:any)=>{
        if(res.data.length >=1){
          this.orders = res.data
          // console.log(res.data);
          
        }else{
          this.orders = []
        }
        // console.log(this.orders);
        
      }
    )
  }


  repetir(productos){
    productos.map(
      p => this.cartService.addToCart(p , p.pivot.quantity)
    )
    
  }

  dateTransform(date){

    const fechaPart = date.split(/-| /) 
    
    const d = fechaPart[2];
    const m = fechaPart[1];
    const y = fechaPart[0];
    const h_m = fechaPart[3].split(":", 2).join(":");
    const h_m_s = fechaPart[3];
    
    const dateFormat = `${d}-${m}-${y}, ${h_m}`;

    return dateFormat

  }
}
