import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notation-modal',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, NgFor],
  templateUrl: './notation-modal.component.html',
  styleUrls: ['./notation-modal.component.scss']
})
export class NotationModalComponent {

  @ViewChild('myComponent') myComponent!: ElementRef;
  
  showModal: boolean = false;
  imgElements:any;
  value: number = 0;
  Arr = Array;

  @Input() titre = "";
  @Input() nbStars: any ;
  @Input() questions: any;


  constructor() {

   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.imgElements = this.myComponent.nativeElement.querySelectorAll('.img-etoile');   
    for( let i=0;i< this.value;i++){
      this.imgElements[i].src = "assets/images/quaero/star_full.png"
    }
  }


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  change_image(n: number): void {
    // this.ngAfterViewInit();
    this.value = +n+1;
    const listImg = this.imgElements;
    for (const element of listImg) {
      const elTitle = element.title;
      const el = +n + 1;  
      if (Number(elTitle) <= el ) {
        element.src = "assets/images/quaero/star_full.png";
      } else {
        element.src = "assets/images/quaero/star_empty.png";
      }
    }
  }

  all_empty_image(){
    this.ngAfterViewInit();
    this.value=0;
    const listImg = this.imgElements;
    for (const element of listImg) {
      element.src = "assets/images/quaero/star_empty.png";
    }
  }
}
