import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  private API_URL = 'http://localhost:3000/';

  todos!:Todo[];
  pageNumber:number=0;

  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.http.get<Todo[]>(this.API_URL + 'todos').subscribe((todos)=>{this.todos=todos;})
  }

  removeTodo(todo:Todo){

    //c'est fait comme cela afin de renouveler la liste sans renouveler la page, pour ne pas perdre la page sur laquelle on était (avec le risque que les données locales ne correspondent pas au serveur, au moins jusqu'à la prochaine fois que la pae soit renouvelée)
    //on vérifie aussi que la page reste pas avec une liste vide, car il restait que 1 todo sur la page
    //c'est fait dans cet ordre, car (je crois) le traitement de l'Observable se finissait pas à temps pour diminuer l'array avant la vérification du if

    const indexTodoToDelete = this.todos.findIndex(todoTmp => {
      return todoTmp.id === todo.id
    });


    if((this.pageNumber)*5>=this.todos.length-1){
      this.previousPage();
    }

    this.http.delete(this.API_URL + 'todo/' + todo.id).subscribe(()=>{this.todos.splice(indexTodoToDelete, 1)});

  }

  previousPage(){
    --this.pageNumber;
    
  }
  nextPage(){
    ++this.pageNumber;
    
  }
}
