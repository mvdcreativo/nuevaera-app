import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Device } = Plugins

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formLogin: FormGroup;
  public submitted = false;
  public error = '';
  public returnUrl: string;
  errorLogin = null;
  username: string;
  platform: "ios" | "android" | "electron" | "web";
  osVersion: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController
  ) { 
    
  }

  ngOnInit() {


    this.devicePlatform()
    this.errorLogin = this.authService.error$
    console.log(this.errorLogin);


    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    this.route.queryParamMap.subscribe(
      data => this.returnUrl = data.get('returnUrl')
    );
    this.route.queryParamMap.subscribe(
      data => {
        this.returnUrl = data.get('returnUrl')

        if (data.get('email') && data.get('token')) {
          // this.openNewPassDialog(data)
        }
        if (data.get('error')) {
          // console.log(data.get('error'));
          const error = data.get('error')

          let message, status;
          message = error;
          status = 'toastError';
          this.authService.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
        }
      }
    );
    // reset login status

  }

  async devicePlatform(){
    let device = await Device.getInfo()
    this.platform = device.platform;
    this.osVersion = parseInt(device.osVersion) ;
    console.log(this.platform);
  }

  onSubmitLogin() {
    this.submitted = true;

    this.authService.login(this.formLogin.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.error = error;
          // this.loading = false;
        });

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Reseteo de contraseña',
      subHeader: 'Te enviaremos un correo electrónico para que cambies tu contraseña',
      animated: true,
      mode: 'ios',
      cssClass: 'input-alert',
      inputs: [
        {

          name: 'email',
          value: '',
          type: 'email',
          placeholder: 'Correo electrónico de la cuenta'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Enviar',
          handler: (res) => {
            console.log(res);

            this.authService.solicitaResetPass(res)
          }
        }
      ]
    });

    await alert.present();

  }


  /////login Social
  //APPLE
  signInApple() {

  this.authService.signApple().then(
      data => {
        console.log(data);
        // if (this.returnUrl) {
        //   this.router.navigate([this.returnUrl]);
        // } else {
        //   this.router.navigate(['/']);
        // }
      }
    ).catch(
      error => {
        this.error = error;
        // this.loading = false;
      }
    )
  }


  //GOOGLE
  signInGoogle() {
    this.authService.signInWithGoogle().then(
      data => {
        console.log(data);
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/']);
        }
      }
    ).catch(
      error => {
        this.error = error;
        // this.loading = false;
      }
    )
  }

  //FACEBOOK
  signInFacebook(){
    this.authService.signInFacebook().then(
      data => {
        // console.log("data "+data);
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/']);
        }
      }
    ).catch(
      error => {
        this.error = error;
        // this.loading = false;
      }
    )
  }
}
