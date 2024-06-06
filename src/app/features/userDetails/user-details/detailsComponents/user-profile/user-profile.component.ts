import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';
import { Posts } from '../../../../../models/posts.model';
import { Todos } from '../../../../../models/todos.model';
import { PostsService } from '../../../../../services/posts.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
 
  posted: Array<Posts>=[];
  todos: Array<Todos>=[]
  userProfile!: Users;
  randomDescription: string = '';
  postNumber: number = 0;

  private userSubscription!: Subscription;
  private postsSubscription!: Subscription;
  private todosSubscription!: Subscription;
  


  constructor(
    private userIdentity: UserIdentityService,
    private postsService:PostsService,
  ) {}


  ngOnInit(): void {

    this.userSubscription = this.userIdentity.currentUser.subscribe(user =>{
      this.userProfile = user;
      this.randomDescription = this.userIdentity.getUserDescription();
    })
    
    this.postsSubscription = this.postsService.singlePostsSource.subscribe(posts =>{
      this.posted=posts;
      this.postNumber = this.posted.length;
    })

    this.todosSubscription = this.userIdentity.currentTodos.subscribe(todos =>{
      this.todos = todos;

    })

  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
    this.todosSubscription.unsubscribe();
  }

}
