import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor } from '@angular/common';
import { Slide } from 'src/app/model/slide';
import { Subscription } from 'rxjs';
import { SlideService } from 'src/app/service/slide.service';
import { env } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-product-slide',
  standalone: true,
  imports: [NgbCarouselModule, NgIf, NgFor, AppRoutingModule],
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css'],
})
export class ProductSlideComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  slidesSubscription: Subscription | undefined;
  apiUrl = env.apiUrl;

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.slidesSubscription = this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  ngOnDestroy(): void {
    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
    }
  }
}
