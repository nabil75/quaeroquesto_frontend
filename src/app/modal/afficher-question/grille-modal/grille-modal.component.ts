import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-grille-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grille-modal.component.html',
  styleUrls: ['./grille-modal.component.scss']
})
export class GrilleModalComponent {

  showModal: boolean = false;

  @Input() titre = "";
  @Input() lignes: any ;
  @Input() colonnes: any;


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

