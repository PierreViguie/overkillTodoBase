import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

//US2
export const changeTodoStatus = createAction(
  '[Todos] Updating Todo\'s Status',
  props<{ todoId: number }>()
);
