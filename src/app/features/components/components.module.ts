import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { UsersViewComponent } from './users-view/users-view.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    SearchBarComponent,
    UsersViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule, 
    ComponentsRoutingModule,
    FormsModule,
  ],
  exports: [HeaderComponent, LogoComponent, UsersViewComponent]
})
export class ComponentsModule { }
