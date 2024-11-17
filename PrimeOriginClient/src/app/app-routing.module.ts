import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
 { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirection par défaut vers login
  { path: '**', redirectTo: '/auth/login' } // Gestion des routes inexistantes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

