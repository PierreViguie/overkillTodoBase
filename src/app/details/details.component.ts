import { Component, OnInit } from '@angular/core';
import {Todo} from '../models/todo';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTodos } from '../store/selectors';
import { loadTodos } from '../store/actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  todos$: Observable<readonly Todo[]>;
  title: string | undefined;
  description: string | undefined;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.todos$ = this.store.select(selectTodos)
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());

    const id = this.route.snapshot.params["id"];
    const detailsTodos$ = this.todos$.pipe(
      map(todos => todos.find(todo => todo.id === Number(id)))
    );


    detailsTodos$.subscribe(todo => {
      this.title = todo?.title ?? 'no title, that is an error';
      this.description = todo?.description ?? 'No details for now... Maybe latter.';
    })
  }
}
