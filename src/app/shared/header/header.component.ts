import { Component } from '@angular/core';
import { LogoService } from '../../services/logo.service';
import { SearchBarService } from '../../services/search-bar.service';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  constructor(
    private logoService: LogoService,
    private searchBarService: SearchBarService,
    private store:Store,
   
  ) {
    this.logoService.isToolbar = true;
  }

  logout(): void {
    this.store.dispatch(logout());
    console.log('ho eseguito il logout')
   
  }

  toggleSearchBar(){
    this.searchBarService.show();
  }
}
