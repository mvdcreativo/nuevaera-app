import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UserActionsComponent } from './user-actions/user-actions.component';
// import { ModalAuthComponent } from './modal-auth/modal-auth.component';
// import { AccessComponent } from './access/access.component';
// import { ResetPassDielogComponent } from './access/reset-pass-dielog/reset-pass-dielog.component';
// import { NewPassDilogComponent } from './access/new-pass-dilog/new-pass-dilog.component';


@NgModule({
  declarations: [
    // LoginComponent,
    // RegisterComponent,
    UserActionsComponent,
    // ModalAuthComponent,
    // AccessComponent,
    // ResetPassDielogComponent,
    // NewPassDilogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserActionsComponent
  ],
  entryComponents: [
    // ModalAuthComponent
  ]
})
export class AuthModule { }
