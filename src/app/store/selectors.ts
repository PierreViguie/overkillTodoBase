import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './reducer';
import { Todo } from '../models/todo';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const selectInitialized = createSelector(
  getState,
  (state: State) => state.initialized
);

export const selectMaxTodoId = createSelector(
  getState, 
  (state: State) => {
    const todos = state.todos;
    console.log('Todos:', todos);  
    if (!todos || todos.length === 0) return 0;  

    return todos.reduce((maxId, todo) => {
      return todo.id > maxId ? todo.id : maxId;
    }, 0);  
  }
);