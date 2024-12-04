import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { State } from '../store/reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectTodos } from '../store/selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { addNewTodo } from '../store/actions';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore<State>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [TodoFormComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;

    dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with title and description', () => {
    expect(component.todoForm.contains('title')).toBeTruthy();
    expect(component.todoForm.contains('description')).toBeTruthy();
  });

  it('should make the title field required', () => {
    const titleControl = component.todoForm.get('title');
    titleControl?.setValue('');
    expect(titleControl?.valid).toBeFalsy();
    titleControl?.setValue('Valid Title');
    expect(titleControl?.valid).toBeTruthy();
  });

  it('should allow description to be optional', () => {
    const descriptionControl = component.todoForm.get('description');
    descriptionControl?.setValue('');
    expect(descriptionControl?.valid).toBeTruthy();
    descriptionControl?.setValue('Some description');
    expect(descriptionControl?.valid).toBeTruthy();
  });

  it('should dispatch addTodo action when the form is valid', () => {
    component.todoForm.setValue ({
      title: 'New Todo',
      description: 'Description of the new todo',
    });

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('#button-submit');
    submitButton.click();

    //default value when state's todos is empty.
    const expectedId = -1;  

    const expectedAction = addNewTodo({ todo: {
      id: expectedId,
      title: 'New Todo',
      description: 'Description of the new todo',
      isClosed: false
    }});

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
