import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-fermee-multiple-branchement',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgFor, MatRadioModule, AutosizeModule],
  templateUrl: './fermee-multiple-branchement.component.html',
  styleUrls: ['./fermee-multiple-branchement.component.scss']
})
export class FermeeMultipleBranchementComponent {

  showModal: boolean = false;

  branchementsModal: any[] = [];
  branchementsAffiches: any[] = [];
  selectedSource: string[] = [];
  selectedDestination: string = '';
  selectedCondition: number = -1;
  conditions: string[] = ["Si la ou les réponses sont ...", "Si la ou les réponses sont différentes de ...", "Si la ou les réponses sont comprises dans ...",
    "S'il n'y a pas de réponse ..."];
  pasDeReponse: boolean = false;
  consigne: string = '';

  @Input() titre = "";
  @Input() modalites: any ;
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
      if (this.selectedCondition == 0 || this.selectedCondition == 1 || this.selectedCondition == 2) {
        if (this.selectedSource.length && this.selectedDestination.length) {
          const n = this.branchementsModal.length;
          const sources = this.selectedSource;
          const indexSourcesToAdd: any[] =[]
          sources.forEach(source =>{
            indexSourcesToAdd.push( this.modalites.findIndex((modalite: { libelle: string; }) => modalite.libelle === source)+1)
          });
          //const indexSourceToAdd = this.modalites.findIndex((modalite: { libelle: string; }) => modalite.libelle === this.selectedSource[0]);
          const indexDestinationToAdd = this.questions.findIndex((question: { libelle: string; }) => question.libelle === this.selectedDestination);
          const newBranchement = {
            position: n + 1,
            source: indexSourcesToAdd,
            destination: indexDestinationToAdd + 1,
            condition: this.selectedCondition
          };
          this.branchementsModal.push(newBranchement);
          const sourcesToAdd: any[] = [];
          let i =1;
          sources.forEach(source =>{
            const indexSourcesToDisplay = this.modalites.findIndex((modalite: { libelle: string; }) => modalite.libelle === source);
            sourcesToAdd.push("("+(i)+") "+this.modalites[indexSourcesToDisplay].libelle+" ");
            i++;
          });
          const newBranchementAffiche = {
            position: n + 1,
            source: sourcesToAdd,
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
      if (this.selectedCondition == 3) {
        if (this.selectedDestination.length) {
          const n = this.branchementsModal.length;
          const indexDestinationToAdd = this.questions.findIndex((question: { libelle: string; }) => question.libelle === this.selectedDestination);
          const newBranchement = {
            position: n + 1,
            source: [],
            destination: indexDestinationToAdd + 1,
            condition: this.selectedCondition
          };
          this.branchementsModal.push(newBranchement);
          const newBranchementAffiche = {
            position: n + 1,
            source: [],
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
      const source: any[] =[];
      if (branchement.source.length>0) {
        let i=1;
        branchement.source.forEach((sourceModal: any) =>{
          sourceModal = this.modalites[sourceModal].libelle;
          source.push("("+(i)+") "+sourceModal+" ")
          i++;
        });
      }
      const destination = branchement.destination;
      const condition = branchement.condition;
      const newBranchement = {
        position: position,
        source: source,
        destination: this.questions[+destination - 1].libelle,
        condition: this.conditions[condition]
      };
      this.branchementsAffiches.push(newBranchement);
    });
  }

  onButtonChange(event: any) {
    this.selectedCondition = event.value;
    if (event.value == 3) {
      this.pasDeReponse = true;
    } else {
      this.pasDeReponse = false;
    }
  }

}