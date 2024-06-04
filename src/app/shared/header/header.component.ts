import { Component } from '@angular/core';
import { LogoService } from '../../services/logo.service';
import { SearchBarService } from '../../services/search-bar.service';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';
import { UserDataService } from '../../services/user-data.service';
import { PostsService } from '../../services/posts.service';



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
    private userDataService:UserDataService,
    private postsService:PostsService
   
  ) {
    this.logoService.isToolbar = true;
  }

  logout(): void {
    this.userDataService.resetAllUsers();
    this.postsService.resetAllPosts();
    this.postsService.resetDisplayedPosts();
    this.store.dispatch(logout());
  }

  toggleSearchBar(){
    this.searchBarService.show();
  }
}
