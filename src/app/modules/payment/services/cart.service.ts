import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { getStorage, setStorage, removeStorage } from "src/app/shared/storage/services/storage.service";




@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

// Array
public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]) 
public observer   :  Subscriber<{}>;
  products:any;

  constructor(
    public snackBar: MatSnackBar
    ) {
  
      getStorage('cartItem').then(res => {
        this.cartItems.next(res || [] )
        this.products = this.cartItems.value
        // console.log(res);
        
      })

      // this.cartItems.subscribe(
      //   products => this.products = products
      // );
      // console.log(this.products);
      
      
   }



ngOnInit(){
  console.log(this.products);
  
}

//     // Get Products
  public getItems(): Observable<CartItem[]> {
    return this.cartItems
    // const itemsStream = new Observable(observer => {
    //   observer.next(this.products);
    //   observer.complete();
    // });
    // return <Observable<CartItem[]>>itemsStream;
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
           this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 1000 });
         }
         return true;
       }
     } );

     // If this.Products does not exist (Add New this.Products)
     if(!hasItem) {
      item = { product: product, quantity: quantity };
      this.products.push(item);
      message = 'El producto ' + product.name + ' se agrego tu carrito';
      status = 'toastSuccess';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 1000 });
    }
  

     setStorage("cartItem", this.products);
     return item;

   }

// Calculate Product stock Counts
public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
  let message, status;
  let qty   = product.quantity + quantity;
  let stock = product.product.stock;
  if(stock < qty) {
    // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
    this.snackBar.open('No puedes agregar, sin stock. En stock ' + stock + ' artículos.', '×', { panelClass: 'toastError', verticalPosition: 'top', duration: 1000 });
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
  return this.cartItems.pipe(map((product: CartItem[]) => {
    if(this.products){
      return this.products.reduce((prev, curr: CartItem) => {
        return prev + curr.product.price * curr.quantity;
      }, 0);

    }
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
      setStorage("cartItem", this.products);
      return true;
    }
  });
}

}