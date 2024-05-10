/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posted: Array<Posts> = [];
  userProfile!: Users;
  emptyPosts: boolean = false;
  isComponentVisible: { [id: number]: boolean } = {};

  constructor(
    private userIdentity: UserIdentityService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    // Get the posts of the user
    this.userIdentity.currentPosts.subscribe((posts) => {
      this.posted = posts;
      if (this.posted.length != 0) {
        return (this.emptyPosts = false);
      } else {
        return (this.emptyPosts = true);
      }
    });

    // Get the profile of the user
    this.userIdentity.currentUser.subscribe((data) => {
      this.userProfile = data;
    });
  }

  toggleComments(id: number) {
    this.isComponentVisible[id] = !this.isComponentVisible[id];
  }
}
