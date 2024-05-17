import { Component, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../services/user-identity.service';
import { Users } from '../../../models/users.model';
import { UserDataService } from '../../../services/user-data.service';
import { UsersService } from '../../../services/users.service';
import { Posts } from '../../../models/posts.model';
import { concatMap, forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrl: './post-overview.component.scss',
})
export class PostOverviewComponent implements OnInit {
  users: Array<Users> = [];
  usersId: number[] = [];

  posts: Array<Posts> = [];
  postList: Array<Posts> = [];


  constructor(
    private userData: UserDataService,
    private userIdentity: UserIdentityService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    //  this.users = this.userData.getDisplayedUsers();
    //  for (const user of this.users) {
    //    const newUserId = user.id;
    //    this.usersId.push(newUserId);
    //  }
 
     this.users = this.userData.getDisplayedUsers();
     this.usersId = this.users.map(user => user.id);
    
     from(this.usersId).pipe(
      concatMap(id => this.usersService.getPosts(id))
    ).subscribe((posts: Posts[]) => {
      this.posts = [...this.posts, ...posts];
      console.log('da over', this.posts);
    });
  

    //  for (const id of this.usersId) {
    //    this.usersService.getPosts(id).subscribe((posts: Posts[]) => {
    //      this.posts = posts;
    //    });
    //  }

    console.log('da over',this.posts)

  }
}
