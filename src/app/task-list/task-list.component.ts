import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Status } from '../model/Status';
import { Todo } from '../model/Todo';
import {  NgForm  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: TaskListComponent}   
  ]
})

export class TaskListComponent implements OnInit {

  
  todoList: Todo[];
  itemList : any; 
  tasks: any[]  

  @ViewChild("edittodoForm") edittodoForm!: NgForm;

  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  constructor(public dialog: MatDialog){
    this.todoList = []
    this.tasks = []


    
    
  }

  ngOnInit(): void {
  

  }

  openDialog() {
    let dialogRef = this.dialog.open(this.callAPIDialog!);
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
              const enabled = "Y"
            } else if (result === 'no') {
              this.dialog.closeAll();
               console.log('User clicked no.');
             
              
               
              
               

               
            }
        }
    })
  }
  
  addTask(item: string){

  this.todoList.push({id:this.todoList.length,title:item,isCompleted:1})
  localStorage.setItem("todos", JSON.stringify(this.todoList));
  var data = localStorage.getItem("todos");
  
  

  

  }
  changeStatus(task: Todo){
    var data = localStorage.getItem("todos");
    this.itemList = JSON.parse(data!);
    let index = this.itemList.findIndex((item: any) => item['id'] == task.id)
    
    if (task.isCompleted == Status.Active){
      this.itemList[index].isCompleted = Status.Completed
      localStorage.setItem("todos", JSON.stringify(this.itemList))
      
    }else{
      this.itemList[index].isCompleted = Status.Active
      localStorage.setItem("todos", JSON.stringify(this.itemList))
     

    }
  }
  getItem(){
    var data = localStorage.getItem("todos");
    this.itemList = JSON.parse(data!);

    
   
  }



  deleteTask(task: any) {
    var data = localStorage.getItem("todos");
    this.itemList = JSON.parse(data!);
    let index = this.itemList.findIndex((item: any) => item['id'] == task.id)
    this.itemList.splice(index,1);
    localStorage.setItem("todos", JSON.stringify(this.itemList))

 
  }
  onSend(form: NgForm){  
    if(form.status === 'INVALID')
    {
      // display error in form
      
    }else{
       
        var data = localStorage.getItem("todos");
        this.itemList = JSON.parse(data!);
        let index = this.itemList.findIndex((item: any) => item['id'] == form.value.todoitemid)
        this.itemList[index].title = form.value.todoitem
        localStorage.setItem("todos", JSON.stringify(this.itemList))
    

        this.dialog.closeAll(); // Close opened diaglog
        form.resetForm();
        
        
    }
    
  }
}
