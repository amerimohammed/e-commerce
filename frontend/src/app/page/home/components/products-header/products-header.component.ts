import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent {
  @Output() columnsNumberChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  itemsShowCount = 12;
  sort = 'desc';

  constructor() {}

  onColumnNumberChange(columnsNumber: number) {
    this.columnsNumberChange.emit(columnsNumber);
  }

  onItemsCountChange(itemsCount: number) {
    this.itemsCountChange.emit(itemsCount);
    this.itemsShowCount = itemsCount;
  }

  onSortChange(sort: string) {
    this.sortChange.emit(sort);
    this.sort = sort;
  }
}
