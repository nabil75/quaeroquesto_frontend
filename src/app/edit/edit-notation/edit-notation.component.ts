import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-edit-notation',
  standalone: true,
  imports: [CommonModule, FormsModule, AutosizeModule],
  templateUrl: './edit-notation.component.html',
  styleUrls: ['./edit-notation.component.scss']
})
export class EditNotationComponent {

  @ViewChild('myComponent') myComponent!: ElementRef;

  typeComponent: string="EditNotationComponent";
  libelleQuestion: string="";
  imgElements:any;
  Arr = Array;
  nbStars: number = 10
  // max: number = this.nbStars;
  value: number = 0;

  ngAfterViewInit(){
    this.imgElements = this.myComponent.nativeElement.querySelectorAll('.img-etoile');   
    for( let i=0;i< this.value;i++){
      this.imgElements[i].src = "assets/images/quaero/star_full.png"
    }
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
