import { role } from "./../scripts/roles.enum";

export class User {
    id='';
    username='';
    email='';
    password='';
    role= role.USER;

    constructor (id, username, email, password,role){
        this.id=id;
        this.username=username;
        this.email=email;
        this.password=password;
        this.role=role;
    }
}