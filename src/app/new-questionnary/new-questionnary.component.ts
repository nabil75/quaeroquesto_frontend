import { Component, ViewChild, ViewContainerRef, ComponentRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FermeeSimpleComponent } from '../fermee-simple/fermee-simple.component';
import { FermeeMultipleComponent } from '../fermee-multiple/fermee-multiple.component';
import { OuverteComponent } from '../ouverte/ouverte.component';
import { EchelleComponent } from '../echelle/echelle.component';
import { GrilleComponent } from '../grille/grille.component';
import { EventEmitterService } from '../services/event-emitter.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NotationComponent } from '../notation/notation.component';
import { SatisfactionComponent } from '../satisfaction/satisfaction.component';
import { AutosizeModule } from 'ngx-autosize';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../services/theme.service';
import { QuestionnaryGeneratorComponent } from '../modal/generator-questionnary/questionnary-generator.component';


@Component({
  selector: 'app-new-questionnary',
  templateUrl: './new-questionnary.component.html',
  styleUrls: ['./new-questionnary.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgClass,
    FormsModule,
    CdkDropList,
    AutosizeModule,
    MatMenuModule,
    TranslateModule,
    MatIconModule,
    QuestionnaryGeneratorComponent,
    CommonModule
],
})

export class NewQuestionnaryComponent implements OnInit {

  public dynamicComponentRefs: ComponentRef<any>[] = [];
  id_questionnary: any;
  img_collapse_expand_all: string = "assets/images/quaero/collapse_all_blanc.png";
  intituleQuestionnaire: string = "";
  statusQuestionnary: string = "Nouveau Questionnaire";
  path_img_question = "";
  path_img_save = "assets/images/quaero/save-blanc.png";
  path_img_effacer = "assets/images/quaero/gomme_blanc.png";
  path_img_ai = "assets/images/quaero/ai_blanc.png";
  activeTheme: string = "";
  isNouveauQuestionnaire: boolean = true;
  questionnary_auto !: any;

  @ViewChild('question', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('generatorModal') generatorModal!: QuestionnaryGeneratorComponent;

  constructor(private eventEmitterService: EventEmitterService,
    private collapseQuestionsService: CollapseQuestionsService,
    private api: ApiService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private themeService: ThemeService
  ) { }



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_questionnary = id;
    this.subscribeToThemeChanges();
  }

  ngAfterViewInit() {
    this.eventEmitterService.invokeFirstComponentFunction.subscribe((idQuestion: number) => {
      this.removeComponent(idQuestion);
    });
    if (this.id_questionnary != undefined) {
      setTimeout(() => {
        this.isNouveauQuestionnaire = false; // setTimeout to wait for the view to be initialized. elsewhere you get an ExpressionChangedAfterItHasBeenCheckedError error
      });
      this.editQuestion();
    }
  }
  // Method to subscribe to theme changes
  subscribeToThemeChanges() {
    this.themeService.activeTheme$.subscribe((theme) => {
      this.activeTheme = theme;
      this.updateImagePaths(theme);  // Update image paths based on the theme
    });
  }
  // Method to update image paths when theme changes
  updateImagePaths(theme: string) {
    if (theme === 'dark') {
      this.path_img_question = "assets/images/quaero/question-blanc.png";
      this.path_img_save = "assets/images/quaero/save-blanc.png";
      this.img_collapse_expand_all = "assets/images/quaero/collapse_all_blanc.png";
      this.path_img_effacer = "assets/images/quaero/gomme_blanc.png";
      this.path_img_ai = "assets/images/quaero/ai_blanc.png";
    } else {
      this.path_img_question = "assets/images/quaero/question-noir.png";
      this.path_img_save = "assets/images/quaero/save-noir.png";
      this.img_collapse_expand_all = "assets/images/quaero/collapse_all_noir.png";
      this.path_img_effacer = "assets/images/quaero/gomme_noir.png";
      this.path_img_ai = "assets/images/quaero/ai_noir.png";
    }
  }

  editQuestion() {
    this.api.getQuestionnary(this.id_questionnary).subscribe(
      (data) => {
        this.intituleQuestionnaire = decodeURIComponent(data[0].intitule);
        this.statusQuestionnary = "Modifier Questionnaire";
        for (let i = 0; i < data[0].content.length; i++) {
          switch (data[0].content[i].type) {
            case 'FermeeSimpleComponent': {
              const questionComponentRef = this.container.createComponent(FermeeSimpleComponent);
              questionComponentRef.instance.libelleQuestion = decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.dataSource = data[0].content[i].modalites.map((modalite: { libelle: string; }) => ({...modalite, libelle: decodeURIComponent(modalite.libelle).replace(/''/g, "'")}));
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire;
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              questionComponentRef.instance.branchements = data[0].content[i].branchements;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'FermeeMultipleComponent': {
              const questionComponentRef = this.container.createComponent(FermeeMultipleComponent);
              questionComponentRef.instance.libelleQuestion = decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.dataSource = data[0].content[i].modalites.map((modalite: { libelle: string; }) => ({...modalite, libelle: decodeURIComponent(modalite.libelle).replace(/''/g, "'")}));
              questionComponentRef.instance.maxReponses = data[0].content[i].maxReponses;
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire;
              questionComponentRef.instance.ordonnee = data[0].content[i].ordonnee;
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              questionComponentRef.instance.branchements = data[0].content[i].branchements;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'OuverteComponent': {
              const questionComponentRef = this.container.createComponent(OuverteComponent);
              questionComponentRef.instance.libelleQuestion = decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              // if (data[0].content[i].reponse == "undefined") {
              //   questionComponentRef.instance.reponseQuestion = "";
              // } else{
              //   questionComponentRef.instance.reponseQuestion = data[0].content[i].reponse;              
              // }
              questionComponentRef.instance.reponseQuestion = decodeURIComponent(data[0].content[i].reponse).replace(/''/g, "'");
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'NotationComponent': {
              const questionComponentRef = this.container.createComponent(NotationComponent);
              questionComponentRef.instance.libelleQuestion = decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.nbStars = data[0].content[i].nbStars;
              questionComponentRef.instance.value = data[0].content[i].note;
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire;
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              for (let i = 0; i < data[0].content[i].note; i++) {
                questionComponentRef.instance.imgElements[i].src = "http://localhost:4200/assets/images/quaero/star_full.png"
              }
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'SatisfactionComponent': {
              const questionComponentRef = this.container.createComponent(SatisfactionComponent);
              questionComponentRef.instance.libelleQuestion = decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.value = data[0].content[i].note;
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire
              questionComponentRef.instance.echelle = data[0].content[i].echelle;
              questionComponentRef.instance.echelle_list = data[0].content[i].echelle_list;
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'GrilleComponent': {
              const questionComponentRef = this.container.createComponent(GrilleComponent);
              questionComponentRef.instance.libelleQuestion = decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.dataSourceLignes = data[0].content[i].lignes.map((ligne: { libelle: string; }) => ({...ligne, libelle: decodeURIComponent(ligne.libelle).replace(/''/g, "'")}));
              questionComponentRef.instance.dataSourceColonnes = data[0].content[i].colonnes.map((colonne: { libelle: string; }) => ({...colonne, libelle: decodeURIComponent(colonne.libelle).replace(/''/g, "'")}));
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire;
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              questionComponentRef.instance.branchements = data[0].content[i].branchements;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'EchelleComponent': {
              const questionComponentRef = this.container.createComponent(EchelleComponent);
              questionComponentRef.instance.libelleQuestion =  decodeURIComponent(data[0].content[i].question).replace(/''/g, "'");
              questionComponentRef.instance.dataSource = data[0].content[i].semantiques.map((semantique: { libelleGauche: string; libelleDroit: string;  }) => 
                ({...semantique, libelleGauche: decodeURIComponent(semantique.libelleGauche).replace(/''/g, "'"), libelleDroit: decodeURIComponent(semantique.libelleDroit).replace(/''/g, "'")}));
              questionComponentRef.instance.obligatoire = data[0].content[i].obligatoire;
              questionComponentRef.instance.isCollapse = data[0].content[i].isCollapse;
              questionComponentRef.instance.isAutoGenerated = data[0].content[i].isAutoGenerated;
              questionComponentRef.instance.initialContent = data[0].content[i].initialContent;
              questionComponentRef.instance.branchements = data[0].content[i].branchements;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
          }
        }
      });
  }

  getQuestionsComponentId() {
    const indexArray: any = [];
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      indexArray.push(componentRef.instance.componentId)
    }
    return indexArray
  }

  createFermeeSimple() {
    const fermeeSimpleComponentRef = this.container.createComponent(FermeeSimpleComponent);
    this.dynamicComponentRefs.push(fermeeSimpleComponentRef);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  createFermeeMultiple() {
    const fermeeMultipleComponentRef = this.container.createComponent(FermeeMultipleComponent);
    this.dynamicComponentRefs.push(fermeeMultipleComponentRef);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  createOuverte(){
    const ouverteComponentRef = this.container.createComponent(OuverteComponent);
    this.dynamicComponentRefs.push(ouverteComponentRef);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  createGrille() {
    const grilleComponentRef = this.container.createComponent(GrilleComponent);
    this.dynamicComponentRefs.push(grilleComponentRef);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  createEchelle() {
    const echelleComponentRef = this.container.createComponent(EchelleComponent);
    this.dynamicComponentRefs.push(echelleComponentRef);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  createNotation() {
    const notationComponentRef = this.container.createComponent(NotationComponent);
    this.dynamicComponentRefs.push(notationComponentRef);
  }

  createSatisfaction() {
    const satisfactionComponentRef = this.container.createComponent(SatisfactionComponent);
    this.dynamicComponentRefs.push(satisfactionComponentRef);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  
  removeComponent(idComponent: number) {
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      if (componentRef.instance['componentId'] === idComponent) {
        componentRef.destroy();
        this.dynamicComponentRefs.splice(i, 1);
      }
    }
  }

  removeAllComponents() {
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      componentRef.destroy();
      this.dynamicComponentRefs.splice(i, 0);
    }
  }

  renderComponents() {
    this.dynamicComponentRefs.forEach(component => {
      this.container.insert(component.hostView);
    });
  }

  onDrop(event: any) {
    moveItemInArray(this.dynamicComponentRefs, event.previousIndex, event.currentIndex);
    this.renderComponents();
  }

  isShowMenuQuestions = true;
  isShowMenuCurrentQuestions = true;
  isShowMenuOthersQuestions = true;

  displayMenuQuestions(): void {
    this.isShowMenuQuestions = !this.isShowMenuQuestions;
  }

  displayMenuCurrentQuestions(): void {
    this.isShowMenuCurrentQuestions = !this.isShowMenuCurrentQuestions;
  }

  displayMenuOthersQuestions(): void {
    this.isShowMenuOthersQuestions = !this.isShowMenuOthersQuestions;
  }

  hashString(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char; // Décalage binaire et addition
      hash |= 0; // Convertir en entier 32 bits signé
    }
    return hash.toString();
  }

  saveQuestionnary(): void {
    const content: any = [];
    const content_question: any = [];
    let quest: string = "";
    let content_modalites: any = [];
    let content_semantiques: any = []
    let content_lignes: any = [];
    let content_colonnes: any = [];

    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;

      quest = encodeURIComponent(componentRef.instance.libelleQuestion).replace(/'/g, "''");
      switch (componentRef.instance.typeComponent) {
        case 'FermeeSimpleComponent': {
          content_modalites = [];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_modalites.push({
              "position": componentRef.instance.dataSource[j].position,
              "libelle": encodeURIComponent(componentRef.instance.dataSource[j].libelle).replace(/'/g, "''"),
              "isChecked": componentRef.instance.dataSource[j].isChecked
            });
          }

          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const hash2 = this.hashString(JSON.stringify(componentRef.instance.dataSource));
          const currentContent:string[] = [hash1, hash2];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }
          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            isCollapse: componentRef.instance.isCollapse,
            question: quest,
            modalites: content_modalites,
            branchements: componentRef.instance.branchements
          });
          break;
        }
        case 'FermeeMultipleComponent': {
          content_modalites = [];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_modalites.push({
              "position": componentRef.instance.dataSource[j].position,
              "libelle": encodeURIComponent(componentRef.instance.dataSource[j].libelle).replace(/'/g, "''").replace(/'/g, "''"),
              "isChecked": componentRef.instance.dataSource[j].isChecked
            });
          }
          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const hash2 = this.hashString(JSON.stringify(componentRef.instance.dataSource));
          const currentContent:string[] = [hash1, hash2];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }
          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            ordonnee: componentRef.instance.ordonnee,
            maxReponses: componentRef.instance.maxReponses,
            isCollapse: componentRef.instance.isCollapse,
            question: quest,
            modalites: content_modalites,
            branchements: componentRef.instance.branchements
          });
          break;
        }
        case 'OuverteComponent': {
          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const currentContent:string[] = [hash1];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }
          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            isCollapse: componentRef.instance.isCollapse,
            reponse: encodeURIComponent(componentRef.instance.reponseQuestion).replace(/'/g, "''"),
            question: quest,
            branchements: componentRef.instance.branchements
          })
          break;
        }
        case 'NotationComponent': {
          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const currentContent:string[] = [hash1];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }
          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            isCollapse: componentRef.instance.isCollapse,
            nbStars: componentRef.instance.nbStars,
            note: componentRef.instance.value,
            question: quest
          })
          break;
        }
        case 'SatisfactionComponent': {
          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const currentContent:string[] = [hash1];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }
          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            isCollapse: componentRef.instance.isCollapse,
            note: componentRef.instance.value,
            echelle: componentRef.instance.echelle,
            echelle_list: componentRef.instance.echelle_list,
            question: quest
          })
          break;
        }
        case 'GrilleComponent': {
          content_lignes = [];
          content_colonnes = [];
          for (let j = 0; j < componentRef.instance.dataSourceLignes.length; j++) {
            content_lignes.push({
              "position": componentRef.instance.dataSourceLignes[j].position,
              "libelle": encodeURIComponent(componentRef.instance.dataSourceLignes[j].libelle).replace(/'/g, "''")
            });
          }
          for (let j = 0; j < componentRef.instance.dataSourceColonnes.length; j++) {
            content_colonnes.push({
              "position": componentRef.instance.dataSourceColonnes[j].position,
              "libelle": encodeURIComponent(componentRef.instance.dataSourceColonnes[j].libelle).replace(/'/g, "''")
            });
          }

          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const hash2 = this.hashString(JSON.stringify(componentRef.instance.dataSourceLignes));
          const hash3 = this.hashString(JSON.stringify(componentRef.instance.dataSourceColonnes));
          const currentContent:string[] = [hash1, hash2, hash3];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }
          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            isCollapse: componentRef.instance.isCollapse,
            question: quest,
            lignes: content_lignes,
            colonnes: content_colonnes,
            branchements: componentRef.instance.branchements
          })
          break;
        }
        case 'EchelleComponent': {
          content_semantiques = [];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_semantiques.push({
              "position": componentRef.instance.dataSource[j].position,
              "libelleGauche": encodeURIComponent(componentRef.instance.dataSource[j].libelleGauche).replace(/'/g, "''"),
              "libelleDroit": encodeURIComponent(componentRef.instance.dataSource[j].libelleDroit).replace(/'/g, "''")
            });
          }
          const hash1 = this.hashString(JSON.stringify(componentRef.instance.libelleQuestion));
          const hash2 = this.hashString(JSON.stringify(componentRef.instance.dataSource));
          const currentContent:string[] = [hash1, hash2];

          if( (componentRef.instance.initialContent).toString() !="" && (componentRef.instance.initialContent).toString() != currentContent.toString()){
            componentRef.instance.isAutoGenerated = false;
          }

          content_question.push({
            type: componentRef.instance.typeComponent,
            isAutoGenerated: componentRef.instance.isAutoGenerated,
            initialContent : currentContent,
            obligatoire: componentRef.instance.obligatoire,
            isCollapse: componentRef.instance.isCollapse,
            question: quest,
            semantiques: content_semantiques,
            branchements: componentRef.instance.branchements
          });
          break;
        }
      }
    }
    const dateCreation: Date = new Date();
    content.push({ intitule: encodeURIComponent(this.intituleQuestionnaire), date: dateCreation, questions: content_question })

    if (this.id_questionnary == undefined) {
      this.api.saveQuestionnary(JSON.stringify(content)).subscribe((response: any) => {
        this.id_questionnary = response
      });
    } else {
      this.api.updateQuestionnary(this.id_questionnary, JSON.stringify(content)).subscribe((response: any) => {
      });
    };
  }

  collapseQuestions() {
    this.collapseQuestionsService.isCollapseAll = !this.collapseQuestionsService.isCollapseAll;
    if (this.img_collapse_expand_all == "assets/images/quaero/collapse_all.png") {
      this.img_collapse_expand_all = "assets/images/quaero/expand_all.png";
    } else {
      this.img_collapse_expand_all = "assets/images/quaero/collapse_all.png";
    }
    this.changeImgCollapse();
  }

  changeImgCollapse() {
    const theme = this.activeTheme;
    if (theme == 'dark') {
      this.collapseQuestionsService.isCollapseAll == true ? this.img_collapse_expand_all = "assets/images/quaero/expand_all_blanc.png" : this.img_collapse_expand_all = "assets/images/quaero/collapse_all_blanc.png";
    } else if (theme == 'light') {
      this.collapseQuestionsService.isCollapseAll == true ? this.img_collapse_expand_all = "assets/images/quaero/expand_all_noir.png" : this.img_collapse_expand_all = "assets/images/quaero/collapse_all_noir.png";
    };
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      componentRef.instance.isCollapse = this.collapseQuestionsService.isCollapseAll;
    }
  }

  generateQuestionnary(): void {
    this.generatorModal.openModal();
  }

  receiveQuestion(data:any){
    if(data != undefined){
     
      this.questionnary_auto = data;
      const data_content = JSON.parse(data);
      console.log(data_content)
      this.intituleQuestionnaire = data_content.intitule_questionnaire;
      const questions = data_content.questions;
      for (const question of questions){
        switch (question.type) {
          case 'fermee unique': {
            const fermeeSimpleComponentRef = this.container.createComponent(FermeeSimpleComponent);
            fermeeSimpleComponentRef.instance.libelleQuestion = question.titre;
            const reponses=[];
            let compt=1
            for (const prop of question.options){
              reponses.push({position: compt, libelle: prop, isChecked: false});
              compt++;
            }
            fermeeSimpleComponentRef.instance.dataSource = reponses;
            fermeeSimpleComponentRef.instance.obligatoire = question.obligatoire;
            fermeeSimpleComponentRef.instance.isAutoGenerated = true;
            this.container.insert(fermeeSimpleComponentRef.hostView);
            this.dynamicComponentRefs.push(fermeeSimpleComponentRef);
            
            break;
          }
          case 'fermee multiple': {
            const fermeeMultipleComponentRef = this.container.createComponent(FermeeMultipleComponent);
            fermeeMultipleComponentRef.instance.libelleQuestion = question.titre;
            const reponses=[];
            let compt=1
            for (const prop of question.options){
              reponses.push({position: compt, libelle: prop, isChecked: false});
              compt++;
            }
            fermeeMultipleComponentRef.instance.dataSource = reponses;
            fermeeMultipleComponentRef.instance.obligatoire = question.obligatoire;
            fermeeMultipleComponentRef.instance.isAutoGenerated = true;
            this.container.insert(fermeeMultipleComponentRef.hostView);
            this.dynamicComponentRefs.push(fermeeMultipleComponentRef);
            break;
          }
          case 'echelle': {
            const echelleComponentRef = this.container.createComponent(EchelleComponent);
            echelleComponentRef.instance.libelleQuestion =  (question.titre).replace(/''/g, "'");
            echelleComponentRef.instance.dataSource = question.semantiques.map((semantique: { position: number;libelleGauche: string; libelleDroit: string;  }) => 
              ({...semantique, position: semantique.position, libelleGauche: (semantique.libelleGauche).replace(/''/g, "'"), libelleDroit: (semantique.libelleDroit).replace(/''/g, "'")}));
            echelleComponentRef.instance.obligatoire = question.obligatoire;
            echelleComponentRef.instance.isAutoGenerated = true;
            this.container.insert(echelleComponentRef.hostView);
            this.dynamicComponentRefs.push(echelleComponentRef);
            break;
          }
          case 'ouverte': {
            const questionComponentRef = this.container.createComponent(OuverteComponent);
            questionComponentRef.instance.libelleQuestion = question.titre;
            questionComponentRef.instance.obligatoire = question.obligatoire;
            questionComponentRef.instance.isAutoGenerated = true;
            this.container.insert(questionComponentRef.hostView);
            this.dynamicComponentRefs.push(questionComponentRef);
            break;
          }
          case 'tableau': {
            const questionComponentRef = this.container.createComponent(GrilleComponent);
            questionComponentRef.instance.libelleQuestion = question.titre;
            const lignes=[];
            let compt_lignes=1
            for (const prop of question.propositions){
              lignes.push({position: compt_lignes, libelle: prop, isChecked: false});
              compt_lignes++;
            }
            questionComponentRef.instance.dataSourceLignes = lignes;
            const colonnes=[];
            let compt_colonnes=1
            for (const prop of question.options){
              colonnes.push({position: compt_colonnes, libelle: prop, isChecked: false});
              compt_colonnes++;
            }
            questionComponentRef.instance.dataSourceColonnes = colonnes;
            questionComponentRef.instance.obligatoire = question.obligatoire;
            questionComponentRef.instance.isAutoGenerated = true;
            this.container.insert(questionComponentRef.hostView);
            this.dynamicComponentRefs.push(questionComponentRef);
            break;
          }
        }
      }
    }
  }
}
