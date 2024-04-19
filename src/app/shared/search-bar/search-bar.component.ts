import { Component } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { UserDataService } from '../../services/user-data.service';

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
  ) {
    searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });
  }

  submit() {
    if (this.search) {
      this.userDataService.searchUsers(this.search);
      console.log(this.userDataService.searchUsers(this.search))
    }
  }
  endSearch() {
    this.showSearchBar = false;
  }
}
