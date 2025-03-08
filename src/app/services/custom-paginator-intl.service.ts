import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntlService extends MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    super();
    this.translateLabels();
    this.translate.onLangChange.subscribe(() => this.translateLabels());
  }

  override itemsPerPageLabel = 'Items per page';
  override nextPageLabel     = 'Next page';
  override previousPageLabel = 'Previous page';
  override firstPageLabel    = 'First page';
  override lastPageLabel     = 'Last page';

  // You can customize the label of the range like this
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} `+ this.translate.instant('PAGINATOR.OF')+` ${length}`;
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('PAGINATOR.ITEMS_PER_PAGE');
    this.nextPageLabel = this.translate.instant('PAGINATOR.NEXT_PAGE');
    this.previousPageLabel = this.translate.instant('PAGINATOR.PREVIOUS_PAGE');
    this.firstPageLabel = this.translate.instant('PAGINATOR.FIRST_PAGE');
    this.lastPageLabel = this.translate.instant('PAGINATOR.LAST_PAGE');
    this.changes.next();  // Refresh labels in UI
  }
  
}
