import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FakoRoutingModule } from './fako-routing.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FakoService } from './fako.service';
import { FakoListComponent } from './fako-list/fako-list.component';



@NgModule({
  declarations: [
    ChatComponent,
    FakoListComponent
  ],
  imports: [
    CommonModule,
    FakoRoutingModule,
    SharedModule,
    HttpClientModule
  
  ],
  providers:[
    FakoService
  ]
})
export class FakoModule { }
