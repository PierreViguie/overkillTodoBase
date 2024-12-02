import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {changeTodoStatus, loadTodosSuccess} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos
    })
  ),
  //US2 : check a todo.
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
