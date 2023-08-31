import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImageService } from '../image.service';
import { ProductImage } from 'src/app/model/product';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-image-upload-form',
  templateUrl: './image-upload-form.component.html',
  styleUrls: ['./image-upload-form.component.css'],
})
export class ImageUploadFormComponent implements OnInit, OnDestroy {
  uploadedImage!: File;
  productImages: Array<ProductImage> = [];
  imagesSubscription: Subscription | undefined;
  @ViewChild('imageFile', { static: false })
  imageFile: ElementRef = new ElementRef(null);

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

  public onImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files?.length > 0) {
      this.uploadedImage = files[0];
    }
  }

  public imageUploadAction() {
    if (this.currentUser) {
      this.imageService
        .save(this.uploadedImage, this.currentUser.token)
        .subscribe((response) => {
          this.imageService.images.next([
            ...this.productImages,
            response.data.image,
          ]);
          this.imageFile.nativeElement.value = null;
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
