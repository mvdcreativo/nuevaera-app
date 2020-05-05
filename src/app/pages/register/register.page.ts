import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public formRegister: FormGroup;
  errorLogin=null;
  public error = '';
  returnUrl: string;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.errorLogin = this.authService.error$
    this.createForm();


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
  }


  createForm(){
    this.formRegister = this.formBuilder.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    });
  }


  onSubmitRegister(){
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.formRegister.value)
     this.authService.register(this.formRegister.value)
      .pipe(first())
      .subscribe(
          data => {

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
