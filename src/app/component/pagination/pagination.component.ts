import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 0;

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if(page < 1 || page > this.totalPages) 
      return;
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      console.log(`Page changed to: ${page}`);
    }

    previousPage(){
      if(this.currentPage > 1){
        this.changePage(this.currentPage - 1);
      }
    }

    nextPage(){
      if(this.currentPage < this.totalPages){
        this.changePage(this.currentPage + 1);
      }
    }
}
