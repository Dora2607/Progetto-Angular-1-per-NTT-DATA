import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Posts } from '../../../models/posts.model';
import { UserIdentityService } from '../../../services/user-identity.service';
import { Users } from '../../../models/users.model';
import { Todos } from '../../../models/todos.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userId!: string;
  userProfile!: Users;
  posts: Array<Posts> = [];


  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private userIdentity: UserIdentityService,
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.getUserById(+this.userId);
    this.updatedPosts(+this.userId);
    this.updatedTodos(+this.userId);

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

  updatedTodos(id:number){
    this.usersService.getTodos(id).subscribe((todos: Array<Todos>)=>{
      this.userIdentity.emitUpdateTodos(todos);
    })
  }

  // go to back
  goToList() {
    window.history.back();
  }
}
