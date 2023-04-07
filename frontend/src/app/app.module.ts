import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { CreateComponent } from './create/create.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { CustomComponent } from './custom/custom.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChartCreatedSuccessComponent } from './chart-created-success/chart-created-success.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserEditedSuccessComponent } from './user-edited-success/user-edited-success.component';
import { MixedChartsComponent } from './mixed-charts/mixed-charts.component';
import { ChartSelectMenuComponent } from './chart-select-menu/chart-select-menu.component';
import { EditChartComponent } from './edit-chart/edit-chart.component';
import { ChatEditedSuccessComponent } from './chat-edited-success/chat-edited-success.component';
import { ChartImportSuccessComponent } from './chart-import-success/chart-import-success.component';
import { FullscreenChartComponent } from './fullscreen-chart/fullscreen-chart.component';
import { SharedChartsComponent } from './shared-charts/shared-charts.component';
import { SharedChartDialogComponent } from './shared-chart-dialog/shared-chart-dialog.component';
import { ChartSharedSuccessComponent } from './chart-shared-success/chart-shared-success.component';
import { ErrorDialogComponentComponent } from './error-dialog-component/error-dialog-component.component';
import { OpenApiComponent } from './open-api/open-api.component';
import { ChartSavedSuccessfullyComponent } from './chart-saved-successfully/chart-saved-successfully.component';

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
