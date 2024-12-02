// todo.actions.spec.ts
import { changeTodoStatus } from './actions'; 

describe('Todos Actions', () => {
  it('should create an action to change todo status', () => {
    const todoId: number = 1; 

    const testedAction = changeTodoStatus({ todoId });

    expect(testedAction).toEqual({
        type: '[Todos] Updating Todo\'s Status',
        todoId: 1,
    })
});

});