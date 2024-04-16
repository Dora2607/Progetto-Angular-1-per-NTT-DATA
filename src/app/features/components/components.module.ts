import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';

import { UsersViewComponent } from './users-view/users-view.component';


@NgModule({
  declarations: [
    UsersViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    ComponentsRoutingModule,

  ],
  exports: [UsersViewComponent]
})
export class ComponentsModule { }
