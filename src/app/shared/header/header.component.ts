import { Component} from '@angular/core';
import { LogoService } from '../../services/logo.service';
import { SearchBarService } from '../../services/search-bar.service';
import { Store } from '@ngrx/store';
import { logout } from '../../state/auth/auth.actions';
import { UserDataService } from '../../services/user-data.service';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  loggedInUser!: Users;
  
  constructor(
    private logoService: LogoService,
    private searchBarService: SearchBarService,
    private store:Store,
    private userDataService:UserDataService,
    private postsService:PostsService,
    private usersService:UsersService
   
  ) {
    this.logoService.isToolbar = true;
    this.loggedInUser = this.usersService.initializePersonalProfile();
  }



  logout(): void {
    this.userDataService.resetAllUsers();
    this.postsService.resetAllPosts();
    this.postsService.removeLoggedInUserPosts(this.loggedInUser.id)
    this.store.dispatch(logout());
  }

  toggleSearchBar(){
    this.searchBarService.show();
  }
}
