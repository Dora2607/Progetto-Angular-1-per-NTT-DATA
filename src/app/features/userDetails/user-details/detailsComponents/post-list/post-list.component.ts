import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  @Input() userId!: string;
  posted: Array<Posts> = []; 
  userProfile!: Users;
  emptyPosts:boolean=false;
  
  constructor(
    private usersService: UsersService,
    private userIdentity: UserIdentityService,
  ) { }

  ngOnInit(): void {
    this.usersService.getPosts(+this.userId).subscribe(
      (posts:Array<Posts>) => {
        this.posted = posts;
        if(this.posted.length!=0){
          return this.emptyPosts=false;
        }else{
          return this.emptyPosts=true;
        }
      }
    )
    this.userIdentity.getUser(this.userId).subscribe(
      (data) => {
        this.userProfile = data;
      }
    );
  }




}
