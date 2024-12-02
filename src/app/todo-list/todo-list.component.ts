import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectTodos} from '../store/selectors';
import {loadTodos, changeTodoStatus} from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodos).pipe(
      map(todos => [...todos].sort((a, b) => {
        return Number(a.isClosed) - Number(b.isClosed);
      })));
  }

  ngOnInit(): void {
     this.store.dispatch(loadTodos());
  }

  onChangeTodoStatus(currentId: number) {
    this.store.dispatch(changeTodoStatus( {todoId: currentId }))
  }
}
