import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlogoutGuard } from './guard/userlogout.guard';
import { UserlogadoGuard } from './guard/userlogado.guard';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate:[UserlogoutGuard] },
  { path: 'new-user', component: NovoUsuarioComponent, canActivate:[UserlogoutGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[UserlogadoGuard]},
  { path: '**', redirectTo: '/auth' },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
