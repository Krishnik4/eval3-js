import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit{
  private API_URL = 'http://localhost:3000/';

  constructor(private router:Router, private http:HttpClient){

  }

  todo!:Todo;

  ngOnInit(){
    this.todo = new Todo();
  }

  addTask(todo:Todo){
    this.http.post(this.API_URL + 'todo',todo).subscribe(()=>{this.router.navigate(['']);});
  }
  cancel(){
    this.router.navigate(['']);
  }
}
