import { Component } from '@angular/core';
import { LogoService } from '../../../services/logo.service';
import { SearchBarService } from '../../../services/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private logoService: LogoService,
    private searchBarService: SearchBarService,
  ) {
    this.logoService.isToolbar = true;
  }

  toggleSearchBar(){
    this.searchBarService.show();
  }
}
