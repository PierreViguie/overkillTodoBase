import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MockComponents, MockDirectives} from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Todo } from '../models/todo';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCard
        ),
        MockDirectives(
          MatCardContent,
          MatCardTitle
        )
      ],
      imports: [MatRippleModule, FormsModule, RouterTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({id: '1'})
            }
          }
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      {id: 1, title: 'todo 1', isClosed: false, description: 'random description 1' },
      {id: 2, title: 'Todo 2', isClosed: true },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get title and description', () => {
    const mockTodos = [{id: 1, title: 'todo 1', isClosed: false, description: 'random description 1' }];
    spyOn(store, 'select').and.returnValue(of(mockTodos));

    component.ngOnInit();
    component.todos$.subscribe(todos => {  
      expect(todos.length).toBe(2);
      expect(todos[0].title).toBe('todo 1');
      expect(todos[0].description).toBe('random description 1');
    });
  });
});
