import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { OrderService } from 'src/app/modules/orders/services/order.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/modules/auth/interfaces/user';
import { CartItem } from 'src/app/modules/payment/interfaces/cart-item';
import { Observable, of } from 'rxjs';
import { CartService } from 'src/app/modules/payment/services/cart.service';

@Component({
  selector: 'app-data-order',
  templateUrl: './data-order.page.html',
  styleUrls: ['./data-order.page.scss'],
})
export class DataOrderPage implements OnInit {
  returnUrl: string;
  public formOrder: FormGroup;
  user: User;
  public buyProducts: CartItem[] = [];
  public amount: number;
  public cartItems: Observable<CartItem[]> = of([]);


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: CartService
  ) { 
    this.user = this.authService.currentUserValue.user
    console.log(this.user);
  }
  
  ngOnInit() {
    this.cartItems = this.cartService.getItems();


    this.cartItems.subscribe(products => {
      this.buyProducts = products

    });
    this.getTotal().subscribe(amount => this.amount = amount);
    
    this.createForm()
  }


  createForm() {
    this.formOrder = this.formBuilder.group({
      user_id : [this.user.id, Validators.required],
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      ci: [this.user.ci, Validators.required],
      company: [this.user.company],
      rut: [this.user.rut],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required]
    })  
  }


  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  onSubmit() {

    const dataProduct = this.buyProducts.map(
      value => {
        const a = {[value.product.id] : { quantity: value.quantity, price: value.product.price }}
        return a
      }
    )

    let dataForm = this.formOrder.value
    dataForm.total = this.amount,
    dataForm.products = dataProduct
    
    this.orderService.addOrder(dataForm).subscribe(      
      (res:any) => {
        // localStorage.removeItem("cartItem");
        const id = res.id
        console.log(res);
        
        //redirecciono a url de pagos en API y a su vez redirecciona a mercadopago////
        location.href= `${environment.urlPago}/${id}`

        localStorage.removeItem('cartItem');
        // this.router.navigate(['/pages/metodos-de-pago/', id ])
        // console.log(res)
      }
    )
      
    

  }
}
