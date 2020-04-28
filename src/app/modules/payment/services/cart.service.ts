import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


declare let fbq:Function;



@Injectable({
  providedIn: 'root'
})
export class CartService {
// Get product from Localstorage
 products 
// Array
public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
public observer   :  Subscriber<{}>;

  constructor(
    public snackBar: MatSnackBar
    ) {
      // this.getObject()
      this.products= this.getObject();
      this.cartItems.subscribe(
        products => this.products = products
      );
   }


   // JSON "get" example
 async getObject() : Promise<{ value: any }>{
  const ret:any = await Storage.get({ key: 'cartItem' });
  return JSON.parse(ret.value);
  
}

    // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(this.products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

   // Add to cart
   public addToCart(product: Product, quantity: number) {
    let message, status;
     var item: CartItem | boolean = false;
     // If Products exist
     let hasItem = this.products.find((items, index) => {
       if(items.product.id == product.id) {
         let qty = this.products[index].quantity + quantity;
         let stock = this.calculateStockCounts(this.products[index], quantity);
         if(qty != 0 && stock) {
          this.products[index]['quantity'] = qty;
           message = 'El producto ' + product.name + ' se agrego tu carrito';
           status = 'toastSuccess';
           this.snackBar.open(message, 'x', { panelClass: [status], verticalPosition: 'top', duration: 1000 });
         }
         return true;
       }
     } );

     // If Products does not exist (Add New Products)
    if(!hasItem) {
      item = { product: product, quantity: quantity };
      this.products.push(item);
      message = 'El producto ' + product.name + ' se agrego tu carrito';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }
  
      this.setItem();
      
     return item;

   }

   async setItem(){
    await Storage.set({key: 'cartItem' , value: JSON.stringify(this.products)});
   }

// Calculate Product stock Counts
public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
  let message, status;
  let qty   = product.quantity + quantity;
  let stock = product.product.stock;
  if(stock < qty) {
    // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
    this.snackBar.open('No puedes agregar, sin stock. En stock ' + stock + ' artículos.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    return false
  }
  return true
}





// Removed in cart
public removeFromCart(item: CartItem) {
  if (item === undefined) return false;
    const index = this.products.indexOf(item);
    this.products.splice(index, 1);
    this.setItem()
}

// Total amount
public getTotalAmount(): Observable<number> {
  return this.cartItems.pipe(map((product: CartItem[]) => {
    return this.products.reduce((prev, curr: CartItem) => {
      return prev + curr.product.price * curr.quantity;
    }, 0);
  }));
}

// Update Cart Value
public updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
  return this.products.find((items, index) => {
    if(items.product.id == product.id) {
      let qty = this.products[index].quantity + quantity;
      let stock = this.calculateStockCounts(this.products[index], quantity);
      if (qty != 0 && stock)
        this.products[index]['quantity'] = qty;
        this.setItem()
      return true;
    }
  });
}


}