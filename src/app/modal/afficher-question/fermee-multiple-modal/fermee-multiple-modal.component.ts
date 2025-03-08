import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-fermee-multiple-modal',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, NgFor, AutosizeModule],
  templateUrl: './fermee-multiple-modal.component.html',
  styleUrls: ['./fermee-multiple-modal.component.scss']
})
export class FermeeMultipleModalComponent {

  showModal: boolean = false;

  @Input() titre = "";
  @Input() modalites: any ;
  @Input() questions: any;


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
}
