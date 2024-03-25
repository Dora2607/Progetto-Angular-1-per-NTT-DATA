import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule, 
    ComponentsRoutingModule,
    
  ],
  exports: [HeaderComponent]
})
export class ComponentsModule { }
