import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuService } from './services/menu.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { getStorage, setStorage, removeStorage } from "src/app/shared/storage/services/storage.service";
import { environment } from 'src/environments/environment';

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
    // this.matIconRegistry.addSvgIcon(
    //   "alimento-perro",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/alimento-perro.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "alimento-gato",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/alimento-gato.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "antipulgas",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/antipulgas.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "snacks",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/snacks.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "productos-en-promocion",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/productos-en-promocion.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "sanitario-gato",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/sanitario-gato.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "casitas",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/casitas.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "accesorios",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/productos-en-promocion.svg")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   "animal-planet-sale",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("https://api.nuevaerauruguay.com/storage/images/icons-app/animal-planet-sale.svg")
    // );
  }

  ngOnInit() {
    this.menuService.categories().subscribe(
      res=>{
        this.itemsCategory = res.map(
          a => {
            a.ico = `${environment.urlFiles}images/icons-app/${a.slug}.svg`;
            return a
          }
        )
      }
    )
    
    this.logeado()
  }

  async logeado(){
    // console.log(this.authService.currentUser);
    
     this.authService.currentUser.subscribe(
      user => {
        // console.log(user);
        
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
