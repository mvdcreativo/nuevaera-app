import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuService } from './services/menu.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'menu-principal',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  itemsCategory: any;

  constructor(
    private menu: MenuController,
    private menuService: MenuService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer

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

  }


  
}
