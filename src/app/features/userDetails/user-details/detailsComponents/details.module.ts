import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommentsComponent } from './comments/comments.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


@NgModule({
  declarations: [UserProfileComponent, CommentsComponent, UserPostsComponent, PostListComponent ],
  imports: [
    CommonModule, 
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [UserProfileComponent, CommentsComponent, UserPostsComponent]
})
export class DetailsModule { }
