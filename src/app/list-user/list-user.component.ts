import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
    providers: [ApiService],
    standalone: true,
    imports: [NgFor]
})
export class ListUserComponent {
  users =[{user_login:"", user_password:""}];

  constructor(private api: ApiService){
    this.getUsers();
  }

  getUsers = () => {
    this.api.getAllUsers().subscribe({
      next: data => this.users = data,
      error: e => console.log(e)
    })  
  }
}
