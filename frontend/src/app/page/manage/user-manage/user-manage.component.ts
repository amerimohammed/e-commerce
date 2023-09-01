import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from 'src/app/model/user';
import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';
import { UserDeleteConfirmComponent } from './components/user-delete-confirm/user-delete-confirm.component';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css'],
})
export class UserManageComponent {
  private user: User;

  constructor(private modalService: NgbModal) {
    this.user = this.initializeUser();
  }

  openModal() {
    const modalRef = this.modalService.open(UserEditFormComponent, {
      scrollable: true,
    });
    modalRef.componentInstance.user = this.user;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(UserDeleteConfirmComponent, {
      scrollable: true,
    });

    modalRef.componentInstance.user = this.user;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }

  openModalEdit(user: User): void {
    this.user = user;
    this.openModal();
  }

  openModalDelete(user: User): void {
    this.user = user;
    this.openDeleteModal();
  }

  private initializeUser(): User {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      username: '',
      token: '',
      roles: [],
    };
  }
}
