import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.module';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() editUser: User | null = null;
  @Output() entryAdded = new EventEmitter<User>();
  @Output() closeModal = new EventEmitter<void>();

  user: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    website: '',
    company: '',
  };
  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.editUser) {
      this.user = { ...this.editUser };
    }
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.editUser) {
        if (this.user.id > 10) {
          this.entryAdded.emit(this.user);
          this.close();
        } else {
          this.userService
            .updateUser(this.user.id, this.user)
            .subscribe((response) => {
              this.entryAdded.emit(response);
              this.close();
            });
        }
      } else {
        this.userService.addUser(this.user).subscribe((response) => {
          this.entryAdded.emit(response);
          this.close();
        });
      }
    }
  }
}
