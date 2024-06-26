import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../../models/users.model';
import { UserDataService } from '../../../../../services/user-data.service';
import { UsersService } from '../../../../../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { newPosts } from '../../../../../models/posts.model';
import { PostsService } from '../../../../../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent implements OnInit {
  loggedInUser!: Users;
  postForm!: FormGroup;
  toggleVisibility: boolean = false;
  toggleIcon: boolean = true;
  addedPosts: { [id: number]: boolean } = {};

  constructor(
    private userDataService: UserDataService,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.usersService.initializePersonalProfile();
    this.initializeCommentForm();
  }

  initializeCommentForm() {
    this.postForm = new FormGroup({
      postTitle: new FormControl(''),
      postText: new FormControl(''),
    });
  }

  addNewPost: newPosts = {
    title: '',
    body: '',
  };

  addPost(id: number) {
    this.addNewPost = {
      title: this.postForm.get('postTitle')?.value,
      body: this.postForm.get('postText')?.value,
    };

    this.usersService.addPosts(id, this.addNewPost).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (post: any) => {
        alert('Post added successfully');
        this.postsService.addPersonalPost(post);
        this.postsService.addPost(id);
      },
    );
  }

  showAddPostBox() {
    this.toggleVisibility = !this.toggleVisibility;
    this.toggleIcon = !this.toggleIcon;
  }
  closeBox(){
    this.toggleVisibility = !this.toggleVisibility;
    this.toggleIcon = !this.toggleIcon;
  }
}
