import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModules } from './material.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModules,
    MatCardModule
  ],
  exports: [
    MaterialModules,
    MatCardModule
  ]
   
})
export class SharedModule { }