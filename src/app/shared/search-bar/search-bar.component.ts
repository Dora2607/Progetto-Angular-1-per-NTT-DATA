import { Component } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { UserDataService } from '../../services/user-data.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  showSearchBar = false;
  search: string | undefined;

  constructor(
    private searchBarService: SearchBarService,
    private userDataService: UserDataService,
    private usersService: UsersService,
  ) {
    searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });
  }
  //search bar
  searchUsers(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.userDataService.setDisplayedUsers(
      this.userDataService.users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.email.toLowerCase().includes(lowerCaseSearchTerm),
      ),
    );
  }
  submit() {
    if (this.search) {
      this.searchUsers(this.search);
    }
  }

  endSearch() {
    this.showSearchBar = false;
    this.usersService.getUsers().subscribe((users) => {
      this.userDataService.setUsers(users);
      this.userDataService.setDisplayedUsers([...users]);
    });
    this.search = '';
  }
}
