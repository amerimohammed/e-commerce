import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css'],
})
export class UserEditFormComponent {
  @Input() user!: User;
  selectRoles = ['ROLE_ADMIN', 'ROLE_EDITOR'];
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
    this.refresh();
  }
  onSubmit() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe((response) => {
      console.log(response);
      this.closeModal('saved');
    });
  }

  refresh() {
    window.location.reload();
  }
}
