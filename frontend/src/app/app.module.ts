import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartCreatedSuccessComponent } from './chart-created-success/chart-created-success.component';
import { ChartImportSuccessComponent } from './chart-import-success/chart-import-success.component';
import { ChartSavedSuccessfullyComponent } from './chart-saved-successfully/chart-saved-successfully.component';
import { ChartSelectMenuComponent } from './chart-select-menu/chart-select-menu.component';
import { ChartSharedSuccessComponent } from './chart-shared-success/chart-shared-success.component';
import { ChatEditedSuccessComponent } from './chat-edited-success/chat-edited-success.component';
import { CreateComponent } from './create/create.component';
import { CustomComponent } from './custom/custom.component';
import { EditChartComponent } from './edit-chart/edit-chart.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ErrorDialogComponentComponent } from './error-dialog-component/error-dialog-component.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FullscreenChartComponent } from './fullscreen-chart/fullscreen-chart.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MixedChartsComponent } from './mixed-charts/mixed-charts.component';
import { OpenApiComponent } from './open-api/open-api.component';
import { RegisterComponent } from './register/register.component';
import { SharedChartDialogComponent } from './shared-chart-dialog/shared-chart-dialog.component';
import { SharedChartsComponent } from './shared-charts/shared-charts.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserEditedSuccessComponent } from './user-edited-success/user-edited-success.component';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { LoginErrorComponent } from './login-error/login-error.component';
import { RegisterErrorComponent } from './register-error/register-error.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MainNavComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    CreateComponent,
    CustomComponent,
    ManageUsersComponent,
    ChartCreatedSuccessComponent,
    EditUserComponent,
    UserEditedSuccessComponent,
    MixedChartsComponent,
    ChartSelectMenuComponent,
    EditChartComponent,
    ChatEditedSuccessComponent,
    ChartImportSuccessComponent,
    FullscreenChartComponent,
    SharedChartsComponent,
    SharedChartDialogComponent,
    ChartSharedSuccessComponent,
    ErrorDialogComponentComponent,
    OpenApiComponent,
    ChartSavedSuccessfullyComponent,
    LoginErrorComponent,
    RegisterErrorComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    NgxMatColorPickerModule,
    MatDialogModule
   ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
