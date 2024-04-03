import { Component } from '@angular/core';
import { LogoService } from '../../../services/logo.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
 constructor(private logoService:LogoService){
  this.logoService.isToolbar =true;
 }

  showSearchBar = false;
  showSidebar = false;
  
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
