import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  userRoles : string[] = this.userAuthService.getRoles();
  containsAdmin: boolean = this.userRoles.indexOf('ROLE_ADMIN') !== -1;

  constructor(public userAuthService:UserAuthService) {}

}
