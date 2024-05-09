import { Component, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';
import { Comments } from '../../../../../models/comments.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
 
  posted: Array<Posts>=[];
  userProfile!: Users;
  randomDescription: string = '';
  postNumber: number = 0;
  commentsList:{ [id:number]: Array<Comments>}={}; 
  commentNumber: number = 0;
  postId:number=0;


  constructor(
    private userIdentity: UserIdentityService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {

    this.userIdentity.currentUser.subscribe(user =>{
      this.userProfile = user;
      this.randomDescription = this.userIdentity.getUserDescription();
    })
    
    this.userIdentity.currentPosts.subscribe(posts =>{
      this.posted=posts;
      this.postNumber = this.posted.length;
    })

    this.userIdentity.currentCommentsCount.subscribe(count =>{
      this.commentNumber = count;
    })
  }
}
