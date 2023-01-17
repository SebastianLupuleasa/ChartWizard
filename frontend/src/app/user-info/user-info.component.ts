import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  username :string = this.userAuthService.getUsername();
  roles:string[] = this.userAuthService.getRoles();

  constructor(private userAuthService: UserAuthService) {

  }

}
