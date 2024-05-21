/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';
import { UserDataService } from '../../../../../services/user-data.service';
import { newComments } from '../../../../../models/comments.model';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentsService } from '../../../../../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  @Input() posts: Array<Posts> = [];

  posted: Array<Posts> = [];
  postedArray: Array<Posts> = [];
  userProfile!: Users;
  emptyPosts: boolean = false;
  isComponentVisible: { [id: number]: boolean } = {};
  addCommentBox: { [id: number]: boolean } = {};
  loggedInUser!: Users;
  commentForm!: FormGroup;

  constructor(
    private router: Router,
    private userIdentity: UserIdentityService,
    private userDataService: UserDataService,
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    this.loggedInUser= this.usersService.initializePersonalProfile();
    this.initializePosts();
    this.initializeCommentForm();
    this.initializeUserProfile();
  }




  initializePosts(){
    const url = this.router.url;
    if (url.includes('usersList')) {
      // Get the posts of the user
      this.userIdentity.currentPosts.subscribe((posts) => {
        this.postedArray = posts;
        if (this.postedArray.length != 0) {
          this.emptyPosts = false;
        } else {
          this.emptyPosts = true;
        }
        this.posted = this.postedArray;
      });
    } else if (url.includes('postOverview')) {
      this.userIdentity.currentPosts.subscribe(posts=>{
        this.posted = posts;
      })
     
    }
  }

  initializeCommentForm(){
    this.commentForm = new FormGroup({
      commentText: new FormControl(''),
    });
  }

  initializeUserProfile(){
    this.userIdentity.currentUser.subscribe((data) => {
      this.userProfile = data;
    });
  }


  //toggle the visibility of the comments and add comment box for a specific post ID
  toggleComments(id: number) {
    this.isComponentVisible[id] = !this.isComponentVisible[id];
  }

  toggleAddComments(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }


  // Add new Comments
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
          ...this.commentsService.getComments(id),
          comment,
        ];
        this.commentsService.setComments(id, newComments);
        
      });
  }

  goBack(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }

}
