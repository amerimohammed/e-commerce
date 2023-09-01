import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-delete-confirm',
  templateUrl: './user-delete-confirm.component.html',
  styleUrls: ['./user-delete-confirm.component.css'],
})
export class UserDeleteConfirmComponent {
  @Input() user!: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
    this.refresh();
  }
  onSubmit() {
    this.userService.deleteUser(this.user.id).subscribe((response) => {
      console.log(response);
      this.closeModal('deleted');
    });
  }

  refresh() {
    window.location.reload();
  }
}
