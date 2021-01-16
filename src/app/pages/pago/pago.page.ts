import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  url: string;



  
  constructor(
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(
      (params:Params) => {
        
        
        if(params.params && params.params.idOrder){
          const orderId = params.params.idOrder
          const url = `${environment.urlPago}/${orderId}`
          this.url = url;
        }
      }
    )
    
  }


}
