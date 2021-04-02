import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/payment/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modules/payment/interfaces/cart-item';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/auth/interfaces/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cartItems : Observable<CartItem[]> = of([]);
  public shoppingCartItems  : CartItem[] = [];
  urlFiles: string = environment.urlFiles;
  user: User;

  constructor(
    private cartService: CartService,
    public actionSheetController: ActionSheetController,
    private authService: AuthService
  ) { 
    this.user = this.authService.currentUserValue?.user

  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => {
      console.log(shoppingCartItems);
      
      return this.shoppingCartItems = shoppingCartItems;
    });

  }


    // Remove cart items
    public removeItem(item: CartItem) {
      this.cartService.removeFromCart(item);
    }


   // Increase Product Quantity
   public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }




  async presentActionSheet(item,animated:boolean = true) {
    let actionSheet = await this.actionSheetController.create({
      mode:"ios",
      header: 'Actualiza cantidad',
      animated: animated,
      buttons: [
        {
          text: 'Eliminar',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.removeItem(item)
          }
        },{
        icon: 'add-outline',
        handler: () => {
          this.increment(item.product)
          actionSheet.dismiss()
          this.presentActionSheet(item,false)
          return false
        }
      }, {
        text: `${item.quantity}`,
        handler:()=>{
          return false
        }
      }, {
        icon: 'remove-outline',
        handler: () => {
          this.decrement(item.product)
          actionSheet.dismiss()
          this.presentActionSheet(item,false)
          return false
        }
      }, {
        text: 'Aceptar',
        // icon: 'close',
        role: 'destructive ',
        handler: () => {
          
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
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
}
