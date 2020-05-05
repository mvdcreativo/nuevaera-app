import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  // {
  //   path : 'acceder',
  //   component : AccessComponent
  // },
  // {
  //   path : 'login',
  //   component : LoginComponent,
  // },
  // {
  //   path : '',
  //   redirectTo : 'acceder',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
