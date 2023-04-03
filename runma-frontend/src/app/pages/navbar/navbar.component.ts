import { Component } from '@angular/core';
import { faCoffee, faPersonRunning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 faCoffee = faCoffee;
//  faduotone =faduotone;
 faPersonRunning = faPersonRunning;
}
