import { Component } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { UserDataService } from '../../services/user-data.service';

import { Users } from '../../models/users.model';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../models/posts.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  showSearchBar = false;
  search!: string;
  usersList: Array<Users> = [];
  postsList: Array<Posts> = [];
  url!: string;

  constructor(
    private searchBarService: SearchBarService,
    private userDataService: UserDataService,
    private postsService: PostsService,
    private router: Router,
  ) {
    searchBarService.show$.subscribe(() => {
      this.showSearchBar = true;
    });

    this.searchBarService.routeChanged.subscribe((url:string)=>{
      this.url = url;
    })

  }


  submit() {

    if (this.url.includes('usersList')) {
      console.log('sono in usersList')
      if (this.search) {
        console.log(this.search);
        this.usersList = this.userDataService.searchUsers(this.search);
        this.userDataService.displayedUsersChanged.next(this.usersList);
      }
    }

    if (this.url.includes('postOverview')) {
      console.log('sono in postsOver')
      if (this.search) {
        console.log(this.search);
        this.postsList = this.postsService.searchPosts(this.search);
        console.log(this.postsList)
        this.postsService.updateDisplayedPosts(this.postsList);
      }
    }
  }

  endSearch() {
    this.showSearchBar = false;
    if (this.url.includes('usersList')) {
      const fullList = this.userDataService.getDisplayedUsers();
      this.userDataService.displayedUsersChanged.next(fullList);
    }
    if (this.url.includes('postOverview')) {
      const fullList = this.postsService.getDispayedPosts();
      this.postsService.postsSource.next(fullList);
    }
    this.search = '';
  }
}
