import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BrowserOpenOptions, Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'mercadopago-web',
  templateUrl: './mercadopago-web.component.html',
  styleUrls: ['./mercadopago-web.component.scss'],
})
export class MercadopagoWebComponent implements OnInit {
@Input() url: string;

options : BrowserOpenOptions = {
  url:"",
  toolbarColor: '#ffffff',
  presentationStyle : 'popover',//iOS only 


};

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.openUrl(this.url)
  }



  openUrl(url){
    this.options.url= url;
    Browser.open(this.options)
      .then(res=>console.log(res))
      .catch(err=>console.log(err));



    // // browser.executeScript(...);

    // // browser.insertCSS(...);
    // browser.on('loadstop').subscribe(event => {
    //   browser.insertCSS({ code: "body{color: red;" });
    // });

    // browser.close();
  }
}
