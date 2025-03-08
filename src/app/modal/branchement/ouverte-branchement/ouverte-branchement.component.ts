import { Component, EventEmitter, Output, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-ouverte-branchement',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgFor, NgIf, MatCardModule, MatSelectModule, MatOptionModule, MatButtonModule, MatRadioModule,
    MatDialogModule, AutosizeModule, MatIconModule],
  templateUrl: './ouverte-branchement.component.html',
  styleUrl: './ouverte-branchement.component.scss'
})
export class OuverteBranchementComponent {
  showModal: boolean = false;
  branchementsModal: any[] = [];
  branchementsAffiches: any[] = [];
  selectedSource: string = '';
  selectedDestination: string = '';
  selectedCondition: number = -1;
  conditions: string[] = ["Si la réponse est ...", "Si la réponse est différente de ...", "S'il n'y a pas de réponse ..."];
  pasDeReponse: boolean = false;
  consigne: string = '';

  @Input() titre = "";
  @Input() modalites: any;
  @Input() questions: any;
  @Input() branchementsImported: any;

  @Output() addBranchementEvent = new EventEmitter<any>();


  constructor() {

  }

  ngOnInit(): void {
    this.branchementsModal = this.branchementsImported;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Vérifier si les data en entrée sont chargées et disponibles
    if (this.branchementsModal && this.modalites && this.questions) {
      this.transformBranchements(); // Appeler la fonction pour afficher en clair les paramètres des branchements
    }
  }
  ngOnAfterViewInit() {

  }
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }
  removeBranchement(position: number) {
    // Step 1: Trouver l'index de l'objet à la position = <argument position>
    const indexToRemove = this.branchementsModal.findIndex(branchement => branchement.position === position);
    // Step 2: Supprimer l'objet s'il existe du tableau d'objets
    if (indexToRemove !== -1) {
      this.branchementsModal.splice(indexToRemove, 1);
      this.branchementsAffiches.splice(indexToRemove, 1);
    }
    // Step 3: Reconstruire le champ position en partant de 1
    this.branchementsModal.forEach((branchement, index) => {
      branchement.position = index + 1;
    });
    this.branchementsAffiches.forEach((branchement, index) => {
      branchement.position = index + 1;
    });
  }
  addBranchement() {
    if (this.selectedCondition != -1) {
      if (this.selectedCondition == 0 || this.selectedCondition == 1) {
        if (this.selectedSource.length && this.selectedDestination.length) {
          const n = this.branchementsModal.length;
          const indexSourceToAdd = this.modalites.findIndex((modalite: { libelle: string; }) => modalite.libelle === this.selectedSource);
          const indexDestinationToAdd = this.questions.findIndex((question: { libelle: string; }) => question.libelle === this.selectedDestination);
          const newBranchement = {
            position: n + 1,
            source: indexSourceToAdd + 1,
            destination: indexDestinationToAdd + 1,
            condition: this.selectedCondition
          };
          this.branchementsModal.push(newBranchement);

          const newBranchementAffiche = {
            position: n + 1,
            source: this.modalites[indexSourceToAdd].libelle,
            destination: this.questions[indexDestinationToAdd].libelle,
            condition: this.conditions[this.selectedCondition]
          };
          this.branchementsAffiches.push(newBranchementAffiche);
          this.addBranchementEvent.emit(this.branchementsModal);
          this.consigne = '';
        } else {
          this.consigne = "Vous devez renseigner les 2 champs 'Reponse', 'A la question ...'."
        }
      }
      if (this.selectedCondition == 2) {
        if (this.selectedDestination.length) {
          const n = this.branchementsModal.length;
          const indexDestinationToAdd = this.questions.findIndex((question: { libelle: string; }) => question.libelle === this.selectedDestination);
          const newBranchement = {
            position: n + 1,
            source: -1,
            destination: indexDestinationToAdd + 1,
            condition: this.selectedCondition
          };
          this.branchementsModal.push(newBranchement);
          const newBranchementAffiche = {
            position: n + 1,
            source: "",
            destination: this.questions[indexDestinationToAdd].libelle,
            condition: this.conditions[this.selectedCondition]
          };
          this.branchementsAffiches.push(newBranchementAffiche);
          this.addBranchementEvent.emit(this.branchementsModal);
          this.consigne = '';
        } else {
          if (this.selectedDestination.length === 0) {
            this.consigne = "Vous devez renseigner le champ 'Aller à la question ...'."
          }
        }
      }
    } else {
      this.consigne = "Vous devez renseigner le champ condition."
    }
  }

  transformBranchements(): void {
    this.branchementsAffiches = [];
    const n = this.branchementsModal.length;
    this.branchementsModal.forEach(branchement => {
      const position = branchement.position;
      let source = ""
      if (branchement.source != -1) {
        const idxSource = branchement.source;
        source = this.modalites[+idxSource - 1].libelle;
      }
      const destination = branchement.destination;
      const condition = branchement.condition;
      const newBranchement = {
        position: position,
        source: source, //this.modalites[+source-1].libelle,
        destination: this.questions[+destination - 1].libelle,
        condition: this.conditions[condition]
      };
      this.branchementsAffiches.push(newBranchement);
    });
  }

  onButtonChange(event: any) {
    this.selectedCondition = event.value;
    // console.log("selected condition after a click on condition : ")
    // console.log(this.selectedCondition)
    if (event.value == 2) {
      this.pasDeReponse = true;
    } else {
      this.pasDeReponse = false;
    }

  }
}
