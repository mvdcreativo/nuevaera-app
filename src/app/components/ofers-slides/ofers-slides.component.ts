import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/auth/interfaces/user';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'ofers-slides',
  templateUrl: './ofers-slides.component.html',
  styleUrls: ['./ofers-slides.component.scss'],
})
export class OfersSlidesComponent implements OnInit {
  @Input() configSlide;
  @Input() slides: any[];


  public urlFiles: string = environment.urlFiles;


  user: User;


  constructor(
    private router : Router,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUserValue?.user
   }

  ngOnInit() 
  {
  }
  onClick(id){
    this.router.navigate(['/product-detail' , id])
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
