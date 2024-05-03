import { Component, Input, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  @Input() userId!: string;
  userProfile!: Users;
  randomDescription: string = '';
  posted: Array<Posts> = [];
  postNumber: number = 0;

  constructor(
    private userIdentity: UserIdentityService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.userIdentity.getUser(this.userId).subscribe((data) => {
      this.userProfile = data;
    });
    this.randomDescription = this.userIdentity.getUserDescription();

    this.usersService
      .getPosts(+this.userId)
      .subscribe((posts: Array<Posts>) => {
        this.posted = posts;
        this.postNumber = this.posted.length;
      });
  }
}
