import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Posts } from '../../../models/posts.model';
import { UserIdentityService } from '../../../services/user-identity.service';
import { Users } from '../../../models/users.model';
import { Todos } from '../../../models/todos.model';
import { PostsService } from '../../../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId!: string;
  userProfile!: Users;
  loggedInUser!: Users;
  posts: Array<Posts> = [];
  addedPosts: { [id: number]: boolean } = {};
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private userIdentity: UserIdentityService,
    private postsService: PostsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.loggedInUser = this.usersService.initializePersonalProfile();
    this.getUserById(+this.userId);
    this.updatedPosts(+this.userId);
    this.updatedTodos(+this.userId);
  }

  getUserById(id: number) {
    this.subscription = this.userIdentity.getUser(id).subscribe((data) => {
      this.userIdentity.emitUpdateUser(data);
    });
  }

  updatedPosts(id: number) {
    if (id !== this.loggedInUser.id) {
      this.usersService.getPosts(id).subscribe((posts: Array<Posts>) => {
        this.postsService.singlePostsSource.next(posts);
      });
    } else {
      const personalPost = this.postsService.getPersonalPosts(id);
      this.postsService.singlePostsSource.next(personalPost);
    }
  }

  updatedTodos(id: number) {
    this.usersService.getTodos(id).subscribe((todos: Array<Todos>) => {
      this.userIdentity.emitUpdateTodos(todos);
    });
  }

  // go to back
  goToList() {
    this.router.navigate(['/home/usersList']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
