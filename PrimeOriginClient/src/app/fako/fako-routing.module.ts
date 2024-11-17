import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FakoListComponent } from './fako-list/fako-list.component';

const routes: Routes = [
  { path: "chat", component: ChatComponent },
  {path: "fako-list", component: FakoListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FakoRoutingModule { }
