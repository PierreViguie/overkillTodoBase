import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {changeTodoStatus, loadTodosSuccess} from './actions';

export const featureKey = 'todosStore';

export interface State {
  initialized: boolean;
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  initialized: false,
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      initialized: true,
      todos
    })
  ),

  on(changeTodoStatus, (state, { todoId }) => {
    const mutableTodos: Todo[] = [...state.todos];
    const updatedTodos = mutableTodos.map(todo =>
      todo.id === todoId ?
        {...todo, isClosed: !todo.isClosed}
        :todo
    )
    return {...state, todos: updatedTodos};
  }
  )
);
