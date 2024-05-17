/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';
import { UserDataService } from '../../../../../services/user-data.service';
import { Comments, newComments } from '../../../../../models/comments.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../../../../services/comments.service';

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
  addCommentBox: { [id: number]: boolean } = {};
  loggedInUser!: Users;

  public commentForm!: FormGroup;

  constructor(
    private userIdentity: UserIdentityService,
    private userDataService: UserDataService,
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    this.userDataService.getLoggedInUser().subscribe((user) => {
      if (user) {
        this.loggedInUser = user;
      }
    });

    // Get the posts of the user
    this.userIdentity.currentPosts.subscribe((posts) => {
      this.posted = posts;
      if (this.posted.length != 0) {
        return (this.emptyPosts = false);
      } else {
        return (this.emptyPosts = true);
      }
    });

    this.commentForm = new FormGroup({
      commentText: new FormControl(''),
    });

    // Get the profile of the user
    this.userIdentity.currentUser.subscribe((data) => {
      this.userProfile = data;
    });
  }

  toggleComments(id: number) {
    this.isComponentVisible[id] = !this.isComponentVisible[id];
  }

  toggleAddComments(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }
  goBack(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }

  addNewComment: newComments = {
    name: '',
    email: '',
    body: '',
  };

  addComment(id: number) {
    this.addNewComment = {
      name: this.loggedInUser.name,
      email: this.loggedInUser.email,
      body: this.commentForm.get('commentText')?.value,
    };

    this.usersService
      .addComments(id, this.addNewComment)
      .subscribe((comment: any) => {
        alert('Comment added successfully');
        const newComments = [
          ...this.commentsService.getDisplayedComments(id),
          comment,
        ];
        this.commentsService.setComments(id, newComments);
        this.commentsService.setDisplayedComments(id, newComments);
        
      });
  }
}
