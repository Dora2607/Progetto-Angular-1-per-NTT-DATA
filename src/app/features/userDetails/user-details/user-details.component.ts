import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Posts } from '../../../models/posts.model';
import { UserIdentityService } from '../../../services/user-identity.service';
import { Users } from '../../../models/users.model';
import { Comments } from '../../../models/comments.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userId!: string;
  userProfile!: Users;
  posts: Array<Posts> = [];
  allComments:Comments[][]=[]

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private userIdentity: UserIdentityService,
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getUserById(+this.userId);
    this.updatedPosts(+this.userId);

    this.usersService.getPosts(+this.userId).subscribe(posts=>{
      this.posts =posts;
      this.posts.forEach(post =>{
        this.usersService.getComments(post.id).subscribe(
          comments =>{
            this.allComments.push(comments)
          }
        )

      })
    })
    console.log(this.allComments)
    console.log(this.allComments.length)

    for (let i: number=0; i<this.allComments.length;i++){
      console.log(i)
    }

    this.userIdentity.emitUpdateCommentsCount(this.allComments.length)

  }

  getUserById(id: number) {
    this.userIdentity.getUser(id).subscribe((data) => {
      this.userIdentity.emitUpdateUser(data);
    });
  }

  updatedPosts(id: number) {
    this.usersService.getPosts(id).subscribe((posts: Array<Posts>) => {
      this.userIdentity.emitUpdatePosts(posts);
    });
  }

  // go to back
  goToList() {
    window.history.back();
  }
}
