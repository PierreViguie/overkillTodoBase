import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      {id: 1,  title: 'todo in memory 1', isClosed: false, description: 'my first task' },
      {id: 2, title: 'todo in memory 2', isClosed: false, description: 'another task' },
      {id: 3, title: 'todo in memory 3', isClosed: true },
      {id: 4, title: 'todo in memory 4', isClosed: false, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis volutpat tincidunt. Etiam bibendum elementum elit, sed finibus magna hendrerit in. Sed consectetur eget quam nec facilisis. Vivamus vel tellus at ipsum iaculis tristique vel vitae massa. Pellentesque fermentum nibh ac nunc consectetur efficitur. Phasellus sodales pulvinar vehicula. Phasellus eget est lacinia, rhoncus magna nec, aliquam augue. Fusce ac dui ipsum. Maecenas quis consequat ipsum. Nullam molestie turpis at libero congue, a congue dolor ultrices. Praesent pretium lorem ipsum. Ut eget lectus malesuada, gravida magna nec, vestibulum dolor. Phasellus vel enim eget nisi convallis euismod. Pellentesque lorem lectus, blandit eu accumsan sit amet, ultrices eu lorem.' },
    ];
    return { todos };
  }

}
