import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { getStorage, setStorage, removeStorage } from "src/app/shared/storage/services/storage.service";
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/interfaces/user';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

// Array
public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]) 
public observer   :  Subscriber<{}>;
  products:any;
  user: User;
  productsOk: Product[];

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private http: HttpClient
    ) {
  
      getStorage('cartItem').then(res => {
        this.checkProducts(res)
        // console.log(res);
        
      })

      // this.cartItems.subscribe(
      //   products => this.products = products
      // );
      // console.log(this.products);
      
      
   }



ngOnInit(){
  // console.log(this.products);
  
}

//     // Get Products
  public getItems(): Observable<CartItem[]> {
    return this.cartItems

  }

   // Add to cart
   public addToCart(product: Product, quantity: number) {
    this.authService.currentUser.pipe(take(1)).subscribe(
      res => {
        this.user = res?.user
      }
    )
    let message, status;
     var item: CartItem | boolean = false;
     // If Products exist
     let hasItem = this.products.find((items, index) => {
       if(items.product.id == product.id) {
         let qty = this.products[index].quantity + quantity;
         let stock = this.calculateStockCounts(this.products[index], quantity);
         if(qty != 0 && stock) {
          this.products[index]['discount_user'] = this.user?.discount || 0
          this.products[index]['discount_product'] = product?.discount
           this.products[index]['quantity'] = qty;
           message = 'El producto ' + product.name + ' se agrego tu carrito';
           status = 'toastSuccess';
           this.snackBar.open(message, '', { panelClass: [status], verticalPosition: 'top', duration: 500 });
         }
         return true;
       }
     } );

     // If this.Products does not exist (Add New this.Products)
     if(!hasItem) {
      item = { product: product, quantity: quantity, discount_user: this.user?.discount  || 0, discount_product: product?.discount };
      this.products.push(item);
      message = 'El producto ' + product.name + ' se agrego tu carrito';
      status = 'toastSuccess';
      this.snackBar.open(message, '', { panelClass: [status], verticalPosition: 'top', duration: 500 });
    }
  

     setStorage("cartItem", this.products);
     return item;

   }


   setCartEmpty(){
    setStorage("cartItem", []);
   }
// Calculate Product stock Counts
public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
  let message, status;
  let qty   = product.quantity + quantity;
  let stock = product.product.stock;
  if(stock < qty) {
    // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
    this.snackBar.open('No puedes agregar, sin stock. En stock ' + stock + ' artículos.', '×', { panelClass: 'toastError', verticalPosition: 'top', duration: 500 });
    return false
  }
  return true
}


// Removed in cart
public removeFromCart(item: CartItem) {
  if (item === undefined) return false;
    const index = this.products.indexOf(item);
    this.products.splice(index, 1);
    setStorage("cartItem", this.products);
}

// Total amount
public getTotalAmount(): Observable<number> {
  this.authService.currentUser.pipe(take(1)).subscribe(
    res => {
      this.user = res?.user
    }
  )
  return this.cartItems.pipe(map((product: CartItem[]) => {
    if(this.products){
      return this.products.reduce((prev, curr: CartItem) => {
        if(this.user?.role === 'UMAY'){
          return prev + this.calculoDesc(curr.product?.price_mayorista  || curr.product?.price, curr.product?.discount, this.user?.discount) * curr.quantity;
        }else{
          return prev + this.calculoDesc(curr.product.price, curr.product?.discount, this.user?.discount) * curr.quantity;
        }
      }, 0);

    }
  }));
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

// Update Cart Value
public updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
  return this.products.find((items, index) => {
    if(items.product.id == product.id) {
      let qty = this.products[index].quantity + quantity;
      let stock = this.calculateStockCounts(this.products[index], quantity);
      if (qty != 0 && stock)
        this.products[index]['quantity'] = qty;
      setStorage("cartItem", this.products);
      return true;
    }
  });
}


  public checkProductsCart(products_ids){

    return this.http.get<Product[]>(`${environment.API}products-by-ids?ids=${products_ids}`).pipe(
      take(1)
    )
  }



  checkProducts(shoppingCartItems){
    
    const ids = shoppingCartItems.map( v => v.product.id)
    // console.log(ids);
    this.checkProductsCart(ids).subscribe(res=> {
      res.length >= 1 ? this.productsOk = res : this.productsOk =[]
      // console.log(this.productsOk);
      
      
      const cartItems = shoppingCartItems.filter( v=>{
          
          const productOk = this.productsOk.find(x=> x.id === v.product.id)

          if(productOk.status !=="DIS" && productOk.status !=="STK"){
            v.product = productOk

            return v;
          }
          return false
      })
      this.cartItems.next(cartItems || [] )
      setStorage("cartItem", cartItems);
      this.products = this.cartItems.value
      // this.shoppingCartItems = cartItems
      console.log(cartItems);
      
    })
    

  }
}