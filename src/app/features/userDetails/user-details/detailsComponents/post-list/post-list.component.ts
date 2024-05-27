/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import { Posts } from '../../../../../models/posts.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';
import { UserDataService } from '../../../../../services/user-data.service';
import { newComments } from '../../../../../models/comments.model';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentsService } from '../../../../../services/comments.service';
import { Router } from '@angular/router';
import { PostsService } from '../../../../../services/posts.service';
import { Subscription, first } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() posts: Array<Posts> = [];
  @Input() users: Array<Users> = [];

  posted: Array<Posts> = [];
  postedArray: Array<Posts> = [];
  userProfile!: Users;
  usersProfiles: { [id: number]: Users } = {};
  emptyPosts: boolean = false;
  isComponentVisible: { [id: number]: boolean } = {};
  addCommentBox: { [id: number]: boolean } = {};
  loggedInUser!: Users;
  commentForm!: FormGroup;
  routerFlag!: boolean;
  addedPosts: { [id: number]: boolean } = {};
  postSubscription!: Subscription; 

  constructor(
    private router: Router,
    private userIdentity: UserIdentityService,
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService,
  ) {}


  ngOnInit(): void {
    this.loggedInUser = this.usersService.initializePersonalProfile();
    this.initializePosts();
    this.initializeCommentForm();


    this.postSubscription = this.postsService.displayedPostsChanged.subscribe(
      (posts: Array<Posts>) => {
        this.posted = posts;
      },
    );
    this.postSubscription.add(this.postsService.getAddedPosts().subscribe(addedPost=>{
      this.addedPosts = addedPost;
    })
  )
  }

  initializePosts() {
    const url = this.router.url;
    if (url.includes('usersList')) {
      console.log('sono entrata in userlist')
      this.postsService.singlePostsSource.subscribe((posts) => {
        console.log(posts,'controllo currentSinglePosts')
        this.postedArray = posts;
        console.log(this.postedArray,'controllo postedArray')
        if (this.postedArray.length != 0) {
          this.emptyPosts = false;
        } else {
          this.emptyPosts = true;
        }
        this.posted = this.postedArray;
        console.log(this.posted,'controllo posted per usersList')
        this.routerFlag = true;
        this.initializeUserProfile();
      });
    } 
    if (url.includes('postOverview')) {
      console.log('sono entrata in postOverview')
      this.postsService.postsSource.subscribe((posts) => {
        if (this.postsService.firstVisit) {
          this.postsService.setAllPosts(posts);
          this.postsService.getAllPostsSet().subscribe(()=>{
            this.postsService.firstVisit=false;
          })
          this.posted = posts;
          
        } else {
          this.posted = this.postsService.getDispayedPosts();
        }
        this.routerFlag = false;
        this.initializeUsersProfiles(this.posted);
      });


    }
  }

  initializeCommentForm() {
    this.commentForm = new FormGroup({
      commentText: new FormControl(''),
    });
  }

  initializeUserProfile() {
    this.userIdentity.currentUser.subscribe((data) => {
      this.userProfile = data;
    });
  }

  initializeUsersProfiles(posts: Posts[]) {
    posts.map((post) => {
      const user = this.users.find((user) => user.id === post.user_id);
      if (user) {
        this.usersProfiles[post.user_id] = user;
      }
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
        const newComments = [...this.commentsService.getComments(id), comment];
        this.commentsService.setComments(id, newComments);
      });
  }

  goBack(id: number) {
    this.addCommentBox[id] = !this.addCommentBox[id];
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    console.log('i subscribe vengono distrutti')
  }
}
