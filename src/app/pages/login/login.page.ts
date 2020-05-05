import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { first } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {

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
      data =>{
        this.returnUrl = data.get('returnUrl')

          if(data.get('email')&&data.get('token')){
            // this.openNewPassDialog(data)
          }
          if(data.get('error')){
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


}
