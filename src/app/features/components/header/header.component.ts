import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showSearchBar = false;
  showSidebar = false;

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
