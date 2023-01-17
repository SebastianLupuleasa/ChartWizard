import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { ChartComponent } from './chart/chart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { CustomComponent } from './custom/custom.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'charts', component: ChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'create', component: CreateMenuComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'create/doughnout', component: CreateComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'custom', component: CustomComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '', component: HomeComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
