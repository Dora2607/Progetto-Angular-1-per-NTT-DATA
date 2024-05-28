import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { UserDataService } from '../../services/user-data.service';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  showSearchBar = false;
  search!: string;
  usersList: Array<Users> = [];
  userList: Array<Users> = [];

  constructor(
    private searchBarService: SearchBarService,
    private userDataService: UserDataService,
    private usersService: UsersService,
  ) {
    searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });
  }
  ngOnInit(): void {
    this.usersList = this.userDataService.getDisplayedUsers();
  }
  //search bar
  // searchUsers(searchTerm: string) {
  //   if(!searchTerm){
  //     return this.userDataService.allUsers.slice()
  //   }
  //   searchTerm = searchTerm.toLowerCase();
  //   return this.userDataService.getDisplayedUsers().filter(
  //     (user) => {
  //       user.name.toLowerCase().includes(searchTerm)||
  //       user.email.toLowerCase().includes(searchTerm);
  //     }
  //   )
    // this.userDataService.setDisplayedUsers(
    //   this.userDataService.displayedUsers.filter(
    //     (user) =>
    //       user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
    //       user.email.toLowerCase().includes(lowerCaseSearchTerm),
    //   ),
    // );
  
  submit() {
    console.log('ha cliccato invio')
    if (this.search) {
      console.log(this.search)
      this.userList=this.userDataService.searchUsers(this.search);
    }
  }

  endSearch() {
    this.showSearchBar = false;
    this.userDataService.getDisplayedUsers();
    this.search = '';
  }
}

