import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const paramId: string | null =
      this.route.snapshot.paramMap.get('productId');
    if (paramId) {
      this.productId = +paramId;
    }

    console.log(this.productId);
  }
}
