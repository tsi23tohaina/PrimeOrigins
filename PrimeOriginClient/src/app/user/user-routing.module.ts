import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegistryComponent } from './registry/registry.component';

const routes: Routes = [
  {path: "auth", component: AuthComponent},
  {path: "registry", component: RegistryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
