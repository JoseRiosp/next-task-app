import { levels } from "./../scripts/levels.enum";


export class Task {
    name ='';
    description='';
    completed=false; 
    level = levels.NORMAL; //auto import 

    constructor (name, description, completed, level){
        this.name=name;
        this.description=description;
        this.completed=completed;
        this.level=level;
    }
}