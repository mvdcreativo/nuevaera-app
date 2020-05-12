import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/auth/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;
  actualiza: any;
  editable : boolean = false

  form: FormGroup
  submitted: boolean;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getUser()

  }

  async getUser(){
  
    
      this.user = this.authService.currentUserValue.user
    // console.log(this.user);
    
  }


  createForm(){
    this.form = this.formBuilder.group({
      id:[this.user.id, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      lastname: [this.user.lastname],
      ci: [this.user.ci],
      company: [this.user.company],
      role:[this.user.role],
      rut: [this.user.rut],
      phone: [this.user.phone],
      address: [this.user.address],
      city:[this.user.city],
      state: [this.user.state],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  async edit(){
    this.createForm()
    this.editable = !this.editable
  }



  async onSubmit(){
    // if (this.form.invalid) {
    //   return;
    // }
    (await this.authService.updateUser(this.form.value)).subscribe(
      res => {
        this.getUser()
        this.editable = false;

      }
    )

  }
      
}
