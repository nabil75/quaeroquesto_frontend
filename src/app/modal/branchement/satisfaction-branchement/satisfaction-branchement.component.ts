import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-satisfaction-branchement',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgFor, AutosizeModule],
  templateUrl: './satisfaction-branchement.component.html',
  styleUrls: ['./satisfaction-branchement.component.scss']
})
export class SatisfactionBranchementComponent {

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