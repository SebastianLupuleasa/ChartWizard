import { RegisterComponent } from './register/register.component';
import { ChartComponent } from './chart/chart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { CustomComponent } from './custom/custom.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MixedChartsComponent } from './mixed-charts/mixed-charts.component';
import { ChartSelectMenuComponent } from './chart-select-menu/chart-select-menu.component';
import { EditChartComponent } from './edit-chart/edit-chart.component';
import { ImportChartComponent } from './import-chart/import-chart.component';

const routes: Routes = [
  {path: 'charts', component: ChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'create', component: ChartSelectMenuComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'simple', component: CreateComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'mixed', component: MixedChartsComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'custom', component: CustomComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'custom/edit', component: EditChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'manage', component: ManageUsersComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'manage/edit', component: EditUserComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'import', component: ImportChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '', component: ChartComponent, canActivate:[AuthGuard], data:{roles:"ROLE_ADMIN"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
