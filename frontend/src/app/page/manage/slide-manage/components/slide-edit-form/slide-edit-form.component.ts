import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { Slide } from 'src/app/model/slide';
import { SlideService } from 'src/app/service/slide.service';

@Component({
  selector: 'app-slide-edit-form',
  templateUrl: './slide-edit-form.component.html',
  styleUrls: ['./slide-edit-form.component.css'],
})
export class SlideEditFormComponent implements OnInit, OnDestroy {
  @Input() slide!: Slide;
  products: Array<Product> = [];
  productsSubscription: Subscription | undefined;
  slides: Array<Slide> = [];
  slidesSubscription: Subscription | undefined;

  uploadedImage!: File;
  @ViewChild('imageFile', { static: false })
  imageFile: ElementRef = new ElementRef(null);

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private slideService: SlideService
  ) {}

  ngOnInit() {
    this.productsSubscription = this.productService
      .getAllproducts()
      .subscribe((response) => (this.products = response.data.products));

    this.slidesSubscription = this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  public onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files?.length > 0) {
      this.uploadedImage = files[0];
    }
  }

  onSubmit() {
    this.slideService
      .save(this.uploadedImage, this.slide.productId)
      .subscribe((response) => {
        console.log(response);
        this.closeModal('saved');
        this.imageFile.nativeElement.value = null;
        this.slideService.slides$.next([...this.slides, response.data.slide]);
      });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
    }
  }
}
