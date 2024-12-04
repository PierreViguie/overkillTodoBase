import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import { DetailsComponent } from './details/details.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: 'details/:id', component: DetailsComponent , pathMatch: 'full' },
  { path: 'create', component: TodoFormComponent , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
