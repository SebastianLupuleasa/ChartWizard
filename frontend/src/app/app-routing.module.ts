import { RegisterComponent } from './register/register.component';
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
import { FullscreenChartComponent } from './fullscreen-chart/fullscreen-chart.component';
import { SharedChartsComponent } from './shared-charts/shared-charts.component';
import { AuthGuardAccess } from './_auth/auth.guard.access';
import { OpenAIApi } from 'openai';
import { OpenApiComponent } from './open-api/open-api.component';

const routes: Routes = [
  {path: 'create', component: ChartSelectMenuComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'simple', component: CreateComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'mixed', component: MixedChartsComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'custom', component: CustomComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'shared', component: SharedChartsComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'custom/edit', component: EditChartComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'manage', component: ManageUsersComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN"]}},
  {path: 'manage/edit', component: EditUserComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN"]}},
  {path: 'login', component: LoginComponent, canActivate:[AuthGuardAccess]},
  {path: 'register', component: RegisterComponent, canActivate:[AuthGuardAccess]},
  {path: 'forbidden', component: ForbiddenComponent, canActivate:[AuthGuard], data:{roles:["ROLE_USER"]}},
  {path: 'fullscreen', component: FullscreenChartComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: 'api', component: OpenApiComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}},
  {path: '', component: CustomComponent, canActivate:[AuthGuard], data:{roles:["ROLE_ADMIN","ROLE_USER"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
