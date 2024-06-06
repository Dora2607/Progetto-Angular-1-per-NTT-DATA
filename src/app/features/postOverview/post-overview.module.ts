import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { DetailsModule } from '../userDetails/user-details/detailsComponents/details.module';
import { ReactiveFormsModule } from '@angular/forms';


import { PostOverviewRoutingModule } from './post-overview-routing.module';
import { PostOverviewComponent } from './post-overview/post-overview.component';
import { AddPostComponent } from './post-overview/postManagement/add-post/add-post.component';
import { AllPostsComponent } from './post-overview/postManagement/all-posts/all-posts.component';



@NgModule({
  declarations: [
    PostOverviewComponent,
    AddPostComponent,
    AllPostsComponent,
  ],
  imports: [
    CommonModule,
    PostOverviewRoutingModule,
    SharedModule,
    DetailsModule,
    ReactiveFormsModule,
  ]
})
export class PostOverviewModule { }
