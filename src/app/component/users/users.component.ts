import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;
  currentPage: number = 1;
  isModalVisible: boolean = false;
  editUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.totalItems = users.length;
      this.updatePaginatedUsers(); 
    })
  }

  updatePaginatedUsers(){
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  onPageChange(page: number){
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  openModal(user?: User){
    this.isModalVisible = true;
    this.editUser = user || null;
  }

  closeModal(){
    this.isModalVisible = false;
    this.editUser = null;
  }

  onEntryAdded(user: User){
    if(this.editUser){
      const index = this.users.findIndex(u => u.id === this.editUser!.id)
      if(index > -1){
        this.users[index] = user;
      }
    }else{
      this.users.push(user)
    }
    this.totalItems = this.users.length;
    this.updatePaginatedUsers();
    this.closeModal();
  }
}
