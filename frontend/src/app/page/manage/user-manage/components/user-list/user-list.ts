import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  PipeTransform,
} from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from 'src/app/model/app-state';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/enum/data-state.enum';
import { MatIconModule } from '@angular/material/icon';
import { env } from 'src/environments/environment';
import { User, UsersType } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    DecimalPipe,
    NgFor,
    AsyncPipe,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    MatIconModule,
  ],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
  providers: [DecimalPipe],
})
export class UserList implements OnInit, OnDestroy {
  appState: AppState<CustomResponse<UsersType>> = {
    dataState: DataState.LOADING,
  };
  private userSubscription: Subscription | undefined;
  apiUrl = env.apiUrl;
  users$: Observable<User[] | undefined>;
  filter = new FormControl('', { nonNullable: true });

  @Output() onEditUser = new EventEmitter<User>();
  @Output() onDeleteUser = new EventEmitter<User>();

  constructor(pipe: DecimalPipe, private userService: UserService) {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe))
    );

    this.userSubscription = this.userService
      .getUsers()
      .subscribe((response) => {
        this.appState = {
          dataState: DataState.LOADED,
          appData: response,
        };

        this.users$ = this.filter.valueChanges.pipe(
          startWith(''),
          map((text) => this.search(text, pipe))
        );
      });
  }

  ngOnInit(): void {}

  search(text: string, pipe: PipeTransform): User[] | undefined {
    return this.appState.appData?.data.users.filter((user) => {
      const term = text.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.username.includes(term)
      );
    });
  }

  editUser(user: User) {
    this.onEditUser.emit(user);
  }

  deleteUser(user: User) {
    this.onDeleteUser.emit(user);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
