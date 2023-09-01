import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Slide } from 'src/app/model/slide';
import { SlideService } from 'src/app/service/slide.service';

@Component({
  selector: 'app-slide-delete-confirm',
  templateUrl: './slide-delete-confirm.component.html',
  styleUrls: ['./slide-delete-confirm.component.css'],
})
export class SlideDeleteConfirmComponent implements OnInit, OnDestroy {
  @Input() slide!: Slide;
  slides: Slide[] = [];
  slidesSubscription: Subscription | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private slideService: SlideService
  ) {}
  ngOnInit(): void {
    this.slidesSubscription = this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
  onSubmit() {
    this.slideService.delete(this.slide.imageId).subscribe((response) => {
      console.log(response);
      this.closeModal('deleted');
      this.slideService.slides$.next(
        this.slides.filter((slide) => slide.imageId !== this.slide.imageId)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
    }
  }
}
