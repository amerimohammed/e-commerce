import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductImage } from 'src/app/model/product';
import { ImageService } from '../image.service';
import { env } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit, OnDestroy {
  productImages: Array<ProductImage> = [];
  imagesSubscription: Subscription | undefined;
  apiUrl = env.apiUrl;

  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | undefined;

  constructor(
    private imageService: ImageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.imagesSubscription = this.imageService.images.subscribe(
      (_images) => (this.productImages = _images)
    );

    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (_user) => {
        this.currentUser = _user;
      }
    );
  }

  onDelete(imageId: number): void {
    if (this.currentUser) {
      this.imageService
        .delete(imageId, this.currentUser.token)
        .subscribe((response) => {
          if (response.data.deleted) {
            this.imageService.images.next(
              this.productImages.filter((image) => image.imageId !== imageId)
            );
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }

    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
