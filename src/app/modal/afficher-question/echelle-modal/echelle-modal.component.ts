import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-echelle-modal',
  standalone: true,
  imports: [CommonModule, MatSliderModule],
  templateUrl: './echelle-modal.component.html',
  styleUrls: ['./echelle-modal.component.scss']
})
export class EchelleModalComponent {

  showModal: boolean = false;

  @Input() titre = "";
  @Input() semantiques: any ;

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

