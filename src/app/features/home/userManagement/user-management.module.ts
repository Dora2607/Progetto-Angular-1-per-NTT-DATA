import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material/material.module';
import { SharedModule } from '../../../shared/shared.module';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';


import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    UsersListComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule, 
    SharedModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [UsersListComponent, AddUserComponent]
})
export class UserManagementModule { }
