import { Status } from "./Status";
export class Todo {
    id: number;
    title: string;
    isCompleted: Status;

    constructor(id: number,title: string,isCompleted: boolean){
        this.id = id
        this.title = title
        this.isCompleted = Status.Active
    }
 
   
}