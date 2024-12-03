import * as fromReducer from './reducer';
import { State } from './reducer';
import { changeTodoStatus, loadTodosSuccess } from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{id:1, title: 'aTitle', isClosed: false }], initialized: true };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('changeTodoStatus action', () => {
    it('should handle change of todo component checklist when check pass to true', () => {
      const todoId = 1;
      const action = changeTodoStatus({ todoId });
      const initialState = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false }],
        initialized: true};
      const newState: State = { todos: [{id:1, title: 'aTitle', isClosed: true }], initialized: true };

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);

    });
  });
});
