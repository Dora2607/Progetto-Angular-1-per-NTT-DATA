import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../shared/material/material.module';

import { PostListComponent } from './post-list/post-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [PostListComponent,UserProfileComponent],
  imports: [
    CommonModule, 
    MaterialModule
  ],
  exports: [PostListComponent,UserProfileComponent]
})
export class DetailsModule { }
