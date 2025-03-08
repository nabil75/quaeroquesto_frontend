import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from 'src/app/api/api.service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutosizeModule } from 'ngx-autosize';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { MatChipsModule } from '@angular/material/chips';

export interface SubTheme {
  name: string;
  selected: boolean;
}

export interface Theme {
  name: string;
  selected: boolean;
  subThemes: SubTheme[];
}

@Component({
  selector: 'app-questionnary-generator',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
    NgFor,
    FormsModule,
    AutosizeModule,
    TranslateModule,
    CdkAccordionModule,
    MatChipsModule,
  ],
  templateUrl: './questionnary-generator.component.html',
  styleUrl: './questionnary-generator.component.scss',
})
export class QuestionnaryGeneratorComponent {
  readonly models: string[] = [
    'gpt-4o-mini',
    'gpt-4o',
    'o1-preview',
    'Meta-Llama-3.3-70B-Instruct-Turbo',
    'Meta-Llama-3.1-8B-Instruct-Turbo',
    'mistral-large-latest'
  ];

  onSelectionChange(): void {
    if(this.modelSelected =="" || this.modelSelected != undefined){
      this.instructionModele=false;
    }else if(this.modelSelected==undefined){
      this.instructionModele=false;
      this.modelSelected = '';
    }else{
      this.instructionModele=true;
    }
  }

  @Output() newQuestionEvent = new EventEmitter<string>();
  @ViewChild('accordionItem0') accordionItem0: CdkAccordionItem | undefined;
  @ViewChild('accordionItem1') accordionItem1: CdkAccordionItem | undefined;
  @ViewChild('accordionItem2') accordionItem2: CdkAccordionItem | undefined;

  modelSelected: string = '';
  showModal: boolean = false;
  libelle_question!: string;
  questionnary_auto!: string;
  modalites_question!: string;
  isLoading = false;
  cadre_etude: string = '';
  role: string = '';
  objet_comprendre: string = '';
  objet_mesurer: string = '';
  finalite: string = '';
  themes: Theme[] = [];
  // themes: string="";
  isDisplayThemes: boolean = false;
  isDisplayCadreEtude: boolean = false;
  isDisplayQuestionnary: boolean = false;
  instructionModele: boolean = false;
  instructionCadreEtude: boolean = false;
  instructionContexte: boolean = false;
  instructionThemes: boolean = false;

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    setTimeout(() => {
      this.togglePanel(this.accordionItem0);
    });
  }

  ngAfterViewInit() {}
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  genererCadreEtude() {
    if (this.modelSelected != '') {
      if (this.cadre_etude != '') {


        try{
          this.instructionCadreEtude = false;
          this.isLoading = true;
          this.api.getCadreEtude(this.cadre_etude, this.modelSelected).subscribe((response) => {
            console.log(response)
            let content_json;
            if(this.modelSelected.includes("Llama")){
              content_json = JSON.parse(response);
            }else{
              content_json = this.extractJsonFromString(response);
            }          
            this.role = content_json[0].role;
            this.objet_comprendre = content_json[0].objet_comprendre;
            this.objet_mesurer = content_json[0].objet_mesurer;
            this.finalite = content_json[0].finalite;
            this.isDisplayCadreEtude = true;
          });

        } catch (error) {
          if (error instanceof Error) {
            console.log("Erreur :", error.message);
          }
        } finally {
          this.isLoading = false;
        }
      } else {
        this.instructionCadreEtude = true;
      }
    } else {
      this.instructionModele = true;
    }
  }

  genererThemes() {
    if (
      this.role != '' &&
      this.objet_comprendre != '' &&
      this.objet_mesurer != '' &&
      this.finalite != ''
    ) {
      this.instructionContexte = false;
      this.isLoading = true;
      this.api
        .getThemes(
          this.role,
          this.objet_comprendre,
          this.objet_mesurer,
          this.finalite, 
          this.modelSelected
        )
        .subscribe((response) => {
          // response.replace(/\//g, '-');
          // const content_json = this.extractJsonFromString(response);

          try {

            let content_json;
            if(this.modelSelected.includes("Llama")){
              content_json = JSON.parse(response);
            }else{
              content_json = this.extractJsonFromString(response);
            }  
            this.themes = content_json;
            this.isDisplayThemes = true;
            this.togglePanel(this.accordionItem1);

          } catch (error) {
            if (error instanceof Error) {
              console.log("Erreur :", error.message);
            }
          } finally {
            this.isLoading = false;
          }
        });
    } else {
      this.instructionContexte = true;
    }
  }
  genererQuestionnaire() {
    this.showSelectedThemes();
    this.instructionThemes = false;
    if (this.selectedThemes.length > 0) {
      this.isLoading = true;
      this.api
        .getQuestionnaire_automatique(
          this.role,
          this.objet_comprendre,
          this.objet_mesurer,
          this.finalite,
          this.selectedThemes,
          this.modelSelected
        )
        .subscribe((response) => {
          // response.replace(/\//g, '-');
          try{
            // let content = JSON.parse(response);
            // this.questionnary_auto = JSON.stringify(content, null, 2);
            this.questionnary_auto = JSON.stringify(response, null, 2);
            this.isDisplayQuestionnary = true;
            this.togglePanel(this.accordionItem2);
          } catch (error) {
            if (error instanceof Error) {
              console.log("Erreur :", error.message);
            }
          } finally {
            this.isLoading = false;
          }
        });
    } else {
      this.instructionThemes = true;
    }

    // this.sendProposition();
  }
  genererModalites() {
    this.api
      .getModalitesFromLmstudio(this.libelle_question)
      .subscribe((response) => {
        this.modalites_question = response.content;
      });
  }

  sendProposition() {
    this.newQuestionEvent.emit(this.questionnary_auto);
  }

  archiverProposition() {
    this.api
      .saveAutomaticProposition(
        encodeURIComponent(this.cadre_etude).replace(/\//g, '%2F'),
        encodeURIComponent(this.role).replace(/\//g, '%2F'),
        encodeURIComponent(this.objet_comprendre).replace(/\//g, '%2F'),
        encodeURIComponent(this.objet_mesurer).replace(/\//g, '%2F'),
        encodeURIComponent(this.finalite).replace(/\//g, '%2F'),
        encodeURIComponent(JSON.stringify(this.themes)).replace(/\//g, '%2F')
      )
      .subscribe((response) => {
        this.modalites_question = response.content;
      });
  }

  // Gestion de la sélection du thème principal
  onThemeChange(theme: Theme) {
    theme.subThemes.forEach((subTheme: any) => {
      subTheme.selected = theme.selected;
    });
  }

  // Gestion de la sélection des sous-thèmes
  onSubThemeChange(theme: Theme, subTheme: SubTheme) {
    if (!subTheme.selected) {
      theme.selected = false;
    } else if (theme.subThemes.every((st: SubTheme) => st.selected)) {
      theme.selected = true;
    }
  }

  // Affichage des thèmes sélectionnés
  selectedThemes: any[] = [];

  showSelectedThemes() {
    this.selectedThemes = this.themes
      .filter(
        (theme) => theme.selected || theme.subThemes.some((st) => st.selected)
      )
      .map((theme) => ({
        name: theme.name,
        subThemes: theme.subThemes.filter((st) => st.selected),
      }));
  }

  extractJsonFromString(text: string): any {
    // Expression régulière pour capturer le contenu JSON entre les backticks
    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    // const jsonMatch = text.match(/[\[{][\s\S]*?[\]}]/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        // Convertir la chaîne extraite en objet JSON
        return JSON.parse(jsonMatch[1].trim());
      } catch (error) {
        console.error('Erreur lors de l’analyse du JSON:', error);
      }
    }

    console.error('Aucun JSON trouvé dans la chaîne.');
    return null;
  }





  activeIndex: number | null = null;

  setActive(index: number): void {
    this.activeIndex = index;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Si le clic se fait en dehors des boutons, réinitialiser activeIndex
    const isButtonClicked = (event.target as HTMLElement).closest(
      '.btn-action'
    );
    if (!isButtonClicked) {
      this.activeIndex = null; // Réinitialise la classe active
    }
  }

  togglePanel(panel: CdkAccordionItem | undefined): void {
    if (panel) {
      panel.expanded = !panel.expanded;
    }
  }
}
