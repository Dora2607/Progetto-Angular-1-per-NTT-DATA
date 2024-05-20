import { Component, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../services/user-identity.service';
import { Users } from '../../../models/users.model';
import { UserDataService } from '../../../services/user-data.service';
import { Posts } from '../../../models/posts.model';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrl: './post-overview.component.scss',
})
export class PostOverviewComponent implements OnInit {

  users: Array<Users> = [];
  usersId: number[] = [];
  posts: Array<Posts> = [];

  constructor(
    private userData: UserDataService,
    private userIdentity: UserIdentityService,
  ) {}

  ngOnInit(): void {
    this.users = this.userData.getDisplayedUsers();
    this.usersId = this.userIdentity.getIds(this.users);
    this.userIdentity.getAllPosts(this.usersId).subscribe((posts) => {
      this.posts = posts;
      this.userIdentity.emitUpdatePosts(this.posts);
    });
  }
}
