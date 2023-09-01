import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from 'src/app/model/app-state';
import { CustomResponse, ProductsType } from 'src/app/model/custom-response';
import { DataState } from 'src/app/enum/data-state.enum';
import { MatIconModule } from '@angular/material/icon';
import { env } from 'src/environments/environment';
import { Slide } from 'src/app/model/slide';
import { SlideService } from 'src/app/service/slide.service';

@Component({
  selector: 'slide-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './slide-list.html',
  styleUrls: ['./slide-list.css'],
})
export class SlideList implements OnInit, OnDestroy {
  appState: AppState<CustomResponse<ProductsType>> = {
    dataState: DataState.LOADING,
  };
  private slideSubscription: Subscription | undefined;
  apiUrl = env.apiUrl;

  slides: Slide[] = [];

  @Output() onDeleteSlide = new EventEmitter<Slide>();

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.slideSubscription = this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }

  deleteSlide(slide: Slide) {
    this.onDeleteSlide.emit(slide);
  }

  ngOnDestroy(): void {
    if (this.slideSubscription) {
      this.slideSubscription.unsubscribe();
    }
  }
}
