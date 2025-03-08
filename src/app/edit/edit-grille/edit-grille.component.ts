import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { ThemeService } from 'src/app/services/theme.service';


export interface ligneElement {
  libelle: string;
  position: number;
  reponse: number
}

const ELEMENT_DATA_LIGNE: ligneElement[] = [];

export interface colonneElement {
  libelle: string;
  position: number;
}

const ELEMENT_DATA_COLONNE: colonneElement[] = [];



@Component({
  selector: 'app-edit-grille',
  standalone: true,
  imports: [CommonModule, FormsModule, AutosizeModule],
  templateUrl: './edit-grille.component.html',
  styleUrls: ['./edit-grille.component.scss']
})
export class EditGrilleComponent {

  typeComponent: string = "EditGrilleComponent";
  showModal: boolean = false;
  libelleQuestion = "";
  dataSourceLignes = [...ELEMENT_DATA_LIGNE];
  dataSourceColonnes = [...ELEMENT_DATA_COLONNE];
  activeTheme: string = "";

  constructor(private themeService: ThemeService) {

  }

  ngOnInit(): void {
    this.subscribeToThemeChanges()
  }

  // Method to subscribe to theme changes
  subscribeToThemeChanges() {
    this.themeService.activeTheme$.subscribe((theme) => {
      this.activeTheme = theme;
    });
  }
  
  onInputChange(event: any) {
    this.dataSourceLignes.forEach((obj) => {
      const reponse = event.target.getAttribute('id').split('_')
      if (obj.position == +reponse[0] + 1) {
        obj.reponse = +reponse[1] + 1;
      }
    });
  }

}