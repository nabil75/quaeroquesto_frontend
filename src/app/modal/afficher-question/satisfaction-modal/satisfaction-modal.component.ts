import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-satisfaction-modal',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, NgFor],
  templateUrl: './satisfaction-modal.component.html',
  styleUrls: ['./satisfaction-modal.component.scss']
})
export class SatisfactionModalComponent {

  showModal: boolean = false;
  value: string = "";
  @Input() titre = "";
  @Input() modalites: any;
  @Input() questions: any;
  @Input() scale: any;
  @Input() scale_list: any;


  constructor() {

  }

  ngOnInit(): void {
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  change_note(event: any): void {
    const elData = event.target.getAttribute('data-value');
    switch (elData) {
      case '1': {
        this.value = "1";
      }
        break;
      case '2': {
        this.value = "2";
      }
        break;
      case '3': {
        this.value = "3";
      }
        break;
      case '4': {
        this.value = "4";
      }
        break;
      case '5': {
        this.value = "5";
      }
        break;
      case '6': {
        this.value = "6";
      }
        break;
      case '7': {
        this.value = "7";
      }
        break;
    }
  }

  all_empty_image() {
    this.value = "";
  }
}
