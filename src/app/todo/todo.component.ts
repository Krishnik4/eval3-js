import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input()
  todo!:Todo;

  @Output()
  removeTodo = new EventEmitter<Todo>();

  removeTodoClick(){
    this.removeTodo.emit(this.todo);
  }
}
