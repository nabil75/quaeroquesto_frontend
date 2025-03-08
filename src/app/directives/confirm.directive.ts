import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[confirm]',
  standalone: true
})
export class ConfirmDirective {
  @Input('confirm') message: string ='';
  @Output() confirmDelete : EventEmitter<void> = new EventEmitter();
  

  @HostListener('click')
  openDialog(): void {
    const confirmation = window.confirm(this.message);
    if (confirmation) this.confirmDelete.emit();
  }

}
