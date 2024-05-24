import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { Posts } from '../models/posts.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  firstVisit: boolean = true;
  allPosts: Array<Posts> = [];
  displayedPosts: Array<Posts> = [];
  private addPostBtnClicked = new BehaviorSubject<{ [id: number]: boolean }>({});


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

  getAddedPosts() {
    return this.addPostBtnClicked.asObservable();
  }

  addPost(id: number) {
    const currentPosts = this.addPostBtnClicked.getValue();
    currentPosts[id] = true;
    this.addPostBtnClicked.next(currentPosts);
  }
}
