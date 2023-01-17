import { RegisterComponent } from './register/register.component';
import { ChartComponent } from './chart/chart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { CustomComponent } from './custom/custom.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {path: 'charts', component: ChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'create', component: CreateComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'custom', component: CustomComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserInfoComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '', component: ChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
