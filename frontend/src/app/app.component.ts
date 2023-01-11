import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static sidebarToggle: boolean = true;

  get sidebarToggle() : boolean {
    return AppComponent.sidebarToggle;
  }
}
