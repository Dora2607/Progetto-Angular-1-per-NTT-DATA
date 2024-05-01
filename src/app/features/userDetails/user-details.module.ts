import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsModule } from './user-details/detailsComponents/details.module';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    UserDetailsComponent, 
  ],
  imports: [
    CommonModule, 
    DetailsModule, 
    UserDetailsRoutingModule
  ],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}
