import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { addNewTodo, loadTodos } from '../store/actions';
import { Todo } from '../models/todo';
import { map, Observable, Subscription } from 'rxjs';
import { selectMaxTodoId } from '../store/selectors';
import { State } from '../store/reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  maxTodoId$: Observable<number | null>;  
  newId : number;
  todoForm: FormGroup;

  private subscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router) { 
    this.newId = -1;
    this.subscription = new Subscription();
    this.maxTodoId$ = store.pipe(select(selectMaxTodoId), map(maxId => maxId +1));  
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.subscription= this.maxTodoId$.subscribe((maxId) => {
      this.newId = maxId ?? 0;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    const newTodo: Todo = {
      id: this.newId,
      title: this.todoForm.get('title')?.value,
      description: this.todoForm.get('description')?.value,
      isClosed: false
    }
    this.store.dispatch(addNewTodo({ todo: newTodo }));
    this.router.navigate(['/']);
  }
}
