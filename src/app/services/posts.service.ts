import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { Posts } from '../models/posts.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  firstVisit: boolean = true;
  addedPost!: boolean;
  allPosts: Array<Posts> = [];
  displayedPosts: Array<Posts> = [];
  private _addPostBtnClicked = new BehaviorSubject<boolean>(false);
  addedPost$ = this._addPostBtnClicked.asObservable();

  constructor(
    private usersService:UsersService
  ) { }

  private postsSource = new BehaviorSubject<Array<Posts>>([]);
  currentPosts = this.postsSource.asObservable();

  allPostsChanged =  new BehaviorSubject<Array<Posts>>([]);
  displayedPostsChanged = new BehaviorSubject<Array<Posts>>([]);



  emitUpdatePosts(posts: Array<Posts>) {
    this.postsSource.next(posts);
  }
  getAllPosts(userIds:number[]):Observable<Posts[]>{
    return forkJoin(userIds.map(id => 
      this.usersService.getPosts(id)
    )).pipe(
      map(arrays => arrays.flat())
    );
  }

  setAllPosts(posts:Array<Posts>){
    this.allPosts = posts;
    this.allPostsChanged.next(this.allPosts.slice());
    this.setDisplayedPosts(this.allPosts)
  }

  setDisplayedPosts(displayedPosts:Array<Posts>){
    this.displayedPosts = displayedPosts;
    this.displayedPostsChanged.next(this.displayedPosts.slice());
  }

  addPersonalPost(post:Posts){
    this.allPosts.unshift(post);
    this.displayedPostsChanged.next(this.allPosts.slice());
    // this.setAddedPost(true);

  }

  getDispayedPosts(){
    return this.allPosts.slice();
  }

  setAddedPost(status: boolean) {
    this._addPostBtnClicked.next(status);
  }
}
