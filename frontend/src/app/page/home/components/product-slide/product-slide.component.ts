import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-slide',
  standalone: true,
  imports: [NgbCarouselModule, NgIf, NgFor],
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css'],
})
export class ProductSlideComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
