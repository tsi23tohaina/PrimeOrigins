import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistryComponent } from './registry/registry.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AuthComponent,
    RegistryComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,

  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
