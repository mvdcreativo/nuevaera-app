import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mercadopago-web',
  templateUrl: './mercadopago-web.component.html',
  styleUrls: ['./mercadopago-web.component.scss'],
})
export class MercadopagoWebComponent implements OnInit {
@Input() url: string;

options : InAppBrowserOptions = {
  location : 'yes',//Or 'no' 
  hidden : 'no', //Or  'yes'
  clearcache : 'yes',
  clearsessioncache : 'yes',
  zoom : 'no',//Android only ,shows browser zoom controls 
  hardwareback : 'yes',
  mediaPlaybackRequiresUserAction : 'no',
  shouldPauseOnSuspend : 'no', //Android only 
  closebuttoncaption : 'Volver', //iOS only
  disallowoverscroll : 'no', //iOS only 
  toolbar : 'yes', //iOS only 
  enableViewportScale : 'no', //iOS only 
  allowInlineMediaPlayback : 'no',//iOS only 
  presentationstyle : 'pagesheet',//iOS only 
  fullscreen : 'yes',//Windows only
  hideurlbar: "yes",
  toolbarcolor: '#ffffff',
  toolbarposition: 'top',


};

  constructor(
    private browser: InAppBrowser,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.openUrl(this.url)
  }



  openUrl(url){
    const browser = this.browser.create(url,'_self', this.options);

    // // browser.executeScript(...);

    // // browser.insertCSS(...);
    // browser.on('loadstop').subscribe(event => {
    //   browser.insertCSS({ code: "body{color: red;" });
    // });

    // browser.close();
  }
}
