import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlogoutGuard } from './guard/userlogout.guard';
import { UserlogadoGuard } from './guard/userlogado.guard';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { PrimeiroAcessoComponent } from './primeiro-acesso/primeiro-acesso.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'new-user', component: NovoUsuarioComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[UserlogadoGuard]},
  // { path: 'primeiro-acesso', component: PrimeiroAcessoComponent, canActivate:[UserlogadoGuard] },
  { path: 'primeiro-acesso', component: PrimeiroAcessoComponent,},

  { path: '**', redirectTo: '/auth' },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
