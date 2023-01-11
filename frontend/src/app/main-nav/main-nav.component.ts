import { Component} from '@angular/core';
import { AppComponent } from '../app.component';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

constructor(private userAuthService:UserAuthService) {
}

public isLoggedIn() {
  return this.userAuthService.isLoggedIn();
}

public logout() {
  this.userAuthService.clear();
}

public toggleSidebar() {
 AppComponent.sidebarToggle = !AppComponent.sidebarToggle;
}

}
