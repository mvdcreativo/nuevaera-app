import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuService } from './services/menu.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { getStorage, setStorage, removeStorage } from "src/app/shared/storage/services/storage.service";

@Component({
  selector: 'menu-principal',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  itemsCategory: any;
  loged: boolean;

  constructor(
    private menu: MenuController,
    private menuService: MenuService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route : Router,
    private authService: AuthService
  ) { 
    this.matIconRegistry.addSvgIcon(
      "alimento-perro",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/alimento-perro.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "alimento-gato",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/alimento-gato.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "antipulgas",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/antipulgas.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "snacks",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/snacks.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "productos-en-promocion",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/productos-en-promocion.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "sanitario-gato",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/sanitario-gato.svg")
    );
  }

  ngOnInit() {
    this.itemsCategory = this.menuService.categories()
    
    this.logeado()
  }

  async logeado(){
    // console.log(this.authService.currentUser);
    
     this.authService.currentUser.subscribe(
      user => {
        console.log(user);
        
        if(user) {
          this.loged = true
        }else{
          this.loged = false
        }
      }
    )

  }

  onClickLink(item){
    this.route.navigate(["/list", item])
    this.menu.close()
  }
  close(){
    this.menu.close()
  }

 login(){
   this.route.navigate(['/login'])
   this.menu.close()
 }
 register(){
  this.route.navigate(['/register'])
  this.menu.close()
}
  logout(){
    this.authService.logout()
  }
}
