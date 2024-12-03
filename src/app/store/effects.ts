import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosFailed, loadTodosSuccess } from './actions';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { select, Store } from '@ngrx/store';
import { selectInitialized } from './selectors';
import { of } from 'rxjs';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.store.pipe(
          select(selectInitialized),  
          take(1),  
          switchMap((initialized) => {
            if (initialized) {
              return of();  
            } else {
              return this.todoService.list().pipe(
                map((todos) => loadTodosSuccess({ todos })),  
                catchError(() => of(loadTodosFailed()))  
              );
            }
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService, private store: Store) {}
}
