import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from 'src/app/api/api.service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-echelle-generator',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule , NgIf, FormsModule],
  templateUrl: './echelle-generator.component.html',
  styleUrls: ['./echelle-generator.component.scss']
})
export class EchelleGeneratorComponent {

  @Output() newQuestionEvent = new EventEmitter<string>();
  
  showModal: boolean = false;
  libelle_question !: string;
  modalites_question !: string;
  spin: boolean = true;

  constructor(private api :ApiService,
  ) { }

  ngOnInit(){

  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  genererQuestion(){
    this.spin=true;
    this.api.getQuestionFromLmstudio().subscribe((response: any) => {
      this.libelle_question = response.content;
    });
    this.spin=false;
  }
  genererModalites(){
    this.api.getModalitesFromLmstudio(this.libelle_question).subscribe((response: any) => {
      this.modalites_question = response.content;
    });
  }
  sendProposition(){
    this.newQuestionEvent.emit(this.libelle_question);
  }
}
