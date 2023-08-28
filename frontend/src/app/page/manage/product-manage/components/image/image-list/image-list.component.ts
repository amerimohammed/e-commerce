import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductImage } from 'src/app/model/product';
import { ImageService } from '../image.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit, OnDestroy {
  productImages: Array<ProductImage> = [];
  imagesSubscription: Subscription | undefined;
  apiUrl = env.apiUrl;
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imagesSubscription = this.imageService.images.subscribe(
      (_images) => (this.productImages = _images)
    );
  }

  onDelete(imageId: number): void {
    this.imageService.delete(imageId).subscribe((response) => {
      if (response.data.deleted) {
        this.imageService.images.next(
          this.productImages.filter((image) => image.imageId !== imageId)
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
