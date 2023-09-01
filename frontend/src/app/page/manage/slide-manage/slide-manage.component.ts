import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlideEditFormComponent } from './components/slide-edit-form/slide-edit-form.component';
import { SlideDeleteConfirmComponent } from './components/slide-delete-confirm/slide-delete-confirm.component';
import { Slide } from 'src/app/model/slide';

@Component({
  selector: 'app-slide-manage',
  templateUrl: './slide-manage.component.html',
  styleUrls: ['./slide-manage.component.css'],
})
export class SlideManageComponent {
  private slide: Slide;

  constructor(private modalService: NgbModal) {
    this.slide = this.initializeSlide();
  }

  openModal() {
    const modalRef = this.modalService.open(SlideEditFormComponent, {
      scrollable: true,
    });

    modalRef.componentInstance.slide = this.slide;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(SlideDeleteConfirmComponent, {
      scrollable: true,
    });

    modalRef.componentInstance.slide = this.slide;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }

  openModalCreate() {
    this.slide = this.initializeSlide();
    this.openModal();
  }

  openModalDelete(slide: Slide): void {
    this.slide = slide;
    this.openDeleteModal();
  }

  private initializeSlide(): Slide {
    return {
      imageId: 0,
      imageUrl: '',
      productId: 0,
    };
  }
}
