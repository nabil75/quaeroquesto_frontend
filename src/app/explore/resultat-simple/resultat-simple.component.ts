import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule, PercentPipe, formatPercent } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutosizeModule } from 'ngx-autosize';


export enum TypeChart {
  bar = 'barChart',
  pie = 'pieChart',
  line = 'lineChart',
  scatter = 'scatterChart',
  osgood = 'osgoodChart',
  notation = 'notationChart',
  satisfaction = 'satisfactionChart',
  grille = 'grilleChart',
  wordcloud ='wordCloudChart'
}

export enum TypeComponent {
  fermee_unique = 'FermeeSimpleComponent',
  fermee_multiple = 'FermeeMultipleComponent',
  ouverte = 'OuverteComponent',
  echelle = 'EchelleComponent',
  satisfaction = 'SatisfactionComponent',
  notation = 'NotationComponent',
  grille = 'GrilleComponent'

}

@Component({
  selector: 'app-resultat-simple',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatMenuModule, MatIconModule, 
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    TranslateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    AutosizeModule
  ],
  templateUrl: './resultat-simple.component.html',
  styleUrls: ['./resultat-simple.component.scss']
})
export class ResultatSimpleComponent {

  private languageChangeSubscription: Subscription = new Subscription();

  data_chart: any;
  source_img: any;
  images: string[] = []; 
  status: string = "Explorer les tendances";
  id_questionnary: any;
  id_commentaire: any ="";
  questions: string[] = [];
  questionSelected: string = "";
  dataSourceTableau = [{ "label": "", "value": 0, "percentage": 0 }];
  sumDataSourceTableau: number = 0;
  numQuestion: string = "";
  activeTheme: string = "";
  path_img_analyse: string = "assets/images/quaero/analyse_blanc.png";
  commentaire: string="";

  dataSourceGrille: any = [[]]
  dataLigneGrille: any = []
  dataColonneGrille: any = []

  isLoading: boolean = false;
  message: any = this.translate.instant('result_simple.message');
  isMessage: boolean = true;
  isMessageChoixTypeGraphique: boolean = false;
  isTableau: boolean = false;
  isTableauGrille: boolean = false;
  isBarChart: boolean = false;
  isPieChart: boolean = false;
  isScatterChart: boolean = false;
  isLineChart: boolean = false;
  isOsgoodChart: boolean = false;
  isStarChart: boolean = false;
  isSatisfactionChart: boolean = false;
  isGrilleChart: boolean = false;
  isWordCloud: boolean = false;
  switchPercentage: boolean = true

  currentQuestion: string = ""
  currentChart: string = ""
  type_tableau: boolean = true;

  disableBarChart: boolean = false;
  disablePieChart: boolean = false;
  disableLineChart: boolean = false;
  disableScatterChart: boolean = false;
  disableOsgoodChart: boolean = false;
  disableNotationChart: boolean = false;
  disableSatisfactionChart: boolean = false;
  disableGrilleChart: boolean = false;
  disableWordCloudChart: boolean = false;


  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private themeService: ThemeService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_questionnary = id;
    this.recoverQuestions();
    this.subscribeToThemeChanges();
    // Listen for language changes and update echelle_list accordingly
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateMessage();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
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
      this.path_img_analyse = "assets/images/quaero/analyse_blanc.png";
    } else if ((theme === 'light')) {
      this.path_img_analyse = "assets/images/quaero/analyse_noir.png";
    }
    if (this.isBarChart == true) { this.showBarChart() };
    if (this.isPieChart == true) { this.showPieChart() };
    if (this.isLineChart == true) { this.showLineChart() };
    if (this.isScatterChart == true) { this.showScatterChart() };
    if (this.isOsgoodChart == true) { this.showOsgoodChart() };
    if (this.isStarChart == true) { this.showNotationChart() };
    if (this.isSatisfactionChart == true) { this.showSatisfactionChart() };
    if (this.isGrilleChart == true) { this.showGrilleChart() };
    if (this.isWordCloud == true) { this.showWordCloudChart() };
  }

  updateMessage() {
    if (this.questionSelected != "") {
      this.message = this.translate.instant('result_simple.choix_type_graphique')
    } else{
      this.message = this.translate.instant('result_simple.message')
    }
  }

  recoverQuestions() {
    this.api.getQuestionnary(this.id_questionnary).subscribe(
      (data) => {
        this.status = decodeURIComponent(data[0].intitule).replace(/''/g, "'");
        this.questions = []
        for (let i = 0; i < data[0].content.length; i++) {
          this.questions.push(decodeURIComponent(data[0].content[i].question).replace(/''/g, "'"));
        }
      });
  }

  isShowMenuAnalyse = true;
  isShowMenuAnalyseUnivariee = true;
  isShowMenuAnalyseBivariee = true;
  isShowMenuAnalyseMultifactorielle = true;

  displayMenuAnalyse(): void {
    this.isShowMenuAnalyse = !this.isShowMenuAnalyse;
  }

  displayMenuAnalyseUnivariee(): void {
    this.isShowMenuAnalyseUnivariee = !this.isShowMenuAnalyseUnivariee;
  }

  displayMenuAnalyseBivariee(): void {
    this.isShowMenuAnalyseBivariee = !this.isShowMenuAnalyseBivariee;
  }

  displayMenuAnalyseMultifactorielle(): void {
    this.isShowMenuAnalyseMultifactorielle = !this.isShowMenuAnalyseMultifactorielle;
  }

  getValQuestion(i: string) {
    this.isMessage = true;
    this.numQuestion = i;
    this.commentaire = "";
    this.updateMessage()
    this.api.getTypeQuestion(this.id_questionnary, this.numQuestion).subscribe(
      (result: any) => {
        this.currentQuestion = result
        switch (result) {
          case TypeComponent.fermee_unique:
            this.disableBarChart = false; this.disablePieChart = false; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = true;
            this.disableNotationChart = true; this.disableSatisfactionChart = true; this.disableGrilleChart = true; this.disableWordCloudChart = true;
            break;
          case TypeComponent.fermee_multiple:
            this.disableBarChart = false; this.disablePieChart = false; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = true;
            this.disableNotationChart = true; this.disableSatisfactionChart = true; this.disableGrilleChart = true; this.disableWordCloudChart = true;
            break;
          case TypeComponent.ouverte:
            this.disableBarChart = true; this.disablePieChart = true; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = true;
            this.disableNotationChart = true; this.disableSatisfactionChart = true; this.disableGrilleChart = true; this.disableWordCloudChart = false;
            break;
          case TypeComponent.echelle:
            this.disableBarChart = true; this.disablePieChart = true; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = false;
            this.disableNotationChart = true; this.disableSatisfactionChart = true; this.disableGrilleChart = true; this.disableWordCloudChart = true;
            break;
          case TypeComponent.grille:
            this.disableBarChart = true; this.disablePieChart = true; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = true;
            this.disableNotationChart = true; this.disableSatisfactionChart = true; this.disableGrilleChart = false; this.disableWordCloudChart = true;
            break;
          case TypeComponent.notation:
            this.disableBarChart = true; this.disablePieChart = true; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = true;
            this.disableNotationChart = false; this.disableSatisfactionChart = true; this.disableGrilleChart = true; this.disableWordCloudChart = true;
            break;
          case TypeComponent.satisfaction:
            this.disableBarChart = true; this.disablePieChart = true; this.disableLineChart = true; this.disableScatterChart = true; this.disableOsgoodChart = true;
            this.disableNotationChart = true; this.disableSatisfactionChart = false; this.disableGrilleChart = true; this.disableWordCloudChart = true;
            break;
        }
      });
      this.api.getComment(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          if(result.length > 0){
            this.commentaire = result[0].comment
            this.id_commentaire = result[0].id_comment
          }
        });
  }

  showBarChart() {
    this.currentChart = "barChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          this.dataSourceTableau = [];
          this.sumDataSourceTableau = 0;
          for (let i = 0; i < (result.values).length; i++) {
            this.sumDataSourceTableau += result.values[i];
          }
          for (let i = 0; i < (result.values).length; i++) {
            const label = result.labels[i].replace(/''/g, "'");
            this.dataSourceTableau.push({ "label": label, "value": result.values[i], "percentage": result.values[i] / this.sumDataSourceTableau })
          }
          this.data_chart = result;
          this.api.getPlotBar(JSON.stringify(this.data_chart), this.activeTheme, this.type_tableau).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
            this.isLoading = false;
          });
        });
      this.isMessage = false;
      this.isTableau = true;
      this.isTableauGrille = false;
      this.isBarChart = true;
      this.isPieChart = false;
      this.isScatterChart = false;
      this.isLineChart = false;
      this.isOsgoodChart = false;
      this.isStarChart = false;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = false;
    }
  }

  showPieChart() {
    this.currentChart = "pieChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          this.dataSourceTableau = [];
          this.sumDataSourceTableau = 0;
          for (let i = 0; i < (result.values).length; i++) {
            this.sumDataSourceTableau += result.values[i];
          }
          for (let i = 0; i < (result.values).length; i++) {
            const label = result.labels[i].replace(/''/g, "'");
            this.dataSourceTableau.push({ "label": label, "value": result.values[i], "percentage": result.values[i] / this.sumDataSourceTableau })
          }
          this.data_chart = result;
          this.api.getPlotPie(JSON.stringify(this.data_chart), this.activeTheme, this.type_tableau).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
            this.isLoading = false;
          });
        });
      this.isMessage = false;
      this.isTableau = true;
      this.isTableauGrille = false;
      this.isBarChart = false;
      this.isPieChart = true;
      this.isScatterChart = false;
      this.isLineChart = false;
      this.isOsgoodChart = false;
      this.isStarChart = false;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = false;
    }
  }
  showScatterChart() {
    this.currentChart = "scatterChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          this.dataSourceTableau = [];
          this.sumDataSourceTableau = 0;
          for (let i = 0; i < (result.values).length; i++) {
            this.sumDataSourceTableau += result.values[i];
          }
          for (let i = 0; i < (result.values).length; i++) {
            const label = result.labels[i].replace(/''/g, "'");
            this.dataSourceTableau.push({ "label": label, "value": result.values[i], "percentage": result.values[i] / this.sumDataSourceTableau })
          }
          this.isLoading = false;

          this.isMessage = false;
          this.isTableau = true;
          this.isTableauGrille = false;
          this.isBarChart = false;
          this.isPieChart = false;
          this.isScatterChart = true;
          this.isLineChart = false;
          this.isOsgoodChart = false;
          this.isStarChart = false;
          this.isSatisfactionChart = false;
          this.isGrilleChart = false;
          this.isWordCloud = false;
        });
    }
  }

  showLineChart() {
    this.currentChart = "lineChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          this.dataSourceTableau = [];
          this.sumDataSourceTableau = 0;
          for (let i = 0; i < (result.values).length; i++) {
            this.sumDataSourceTableau += result.values[i];
          }
          for (let i = 0; i < (result.values).length; i++) {
            const label = result.labels[i].replace(/''/g, "'");
            this.dataSourceTableau.push({ "label": label, "value": result.values[i], "percentage": result.values[i] / this.sumDataSourceTableau })
          }
          this.data_chart = result;
          this.api.getPlotLine(JSON.stringify(this.data_chart)).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
            this.isLoading = false;
          });
        });
      this.isMessage = false;
      this.isTableau = true;
      this.isTableauGrille = false;
      this.isBarChart = false;
      this.isPieChart = false;
      this.isScatterChart = false;
      this.isLineChart = true;
      this.isOsgoodChart = false;
      this.isStarChart = false;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = false;
    }
  }

  showOsgoodChart() {
    this.currentChart = "osgoodChart";
    this.switchPercentage = false;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsEchelle(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          const new_data = JSON.stringify(result.data)
          this.api.getPlotOsgood(new_data, result.semantiqueGauche, result.semantiqueDroite, this.activeTheme).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
            this.isLoading = false;
          });
        });
      this.isMessage = false;
      this.isTableau = false;
      this.isTableauGrille = false;
      this.isBarChart = false;
      this.isPieChart = false;
      this.isScatterChart = false;
      this.isLineChart = false;
      this.isOsgoodChart = true;
      this.isStarChart = false;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = false;
    }

  }

  showNotationChart() {
    this.currentChart = "notationChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsNotation(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          this.data_chart = result
          const valuesArray: number[] = Object.values(result);
          const max_stars = Object.keys(result).length;
          const star_size: string = "20";
          this.api.getPlotNotation(valuesArray, this.activeTheme, max_stars, star_size, this.type_tableau).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
            this.isLoading = false;
          });
        });
      this.isMessage = false;
      this.isTableau = false;
      this.isTableauGrille = false;
      this.isBarChart = false;
      this.isPieChart = false;
      this.isScatterChart = false;
      this.isLineChart = false;
      this.isOsgoodChart = false;
      this.isStarChart = true;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = false;
    }
  }

  showSatisfactionChart() {
    this.currentChart = "satisfactionChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsSatisfaction(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {
          this.data_chart = result;
          const data: number[] = Object.values(this.data_chart.occurrences);
          this.api.getPlotSatisfaction(data, this.data_chart.niveaux, this.activeTheme, this.type_tableau).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
            this.isLoading = false;
          });
          this.isMessage = false;
          this.isTableau = false;
          this.isTableauGrille = false;
          this.isBarChart = false;
          this.isPieChart = false;
          this.isScatterChart = false;
          this.isLineChart = false;
          this.isOsgoodChart = false;
          this.isStarChart = false;
          this.isSatisfactionChart = true;
          this.isGrilleChart = false;
          this.isWordCloud = false;
        });
    }
  }

  showGrilleChart() {
    this.currentChart = "grilleChart";
    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getResultsGrille(this.id_questionnary, this.numQuestion).subscribe(
        (result: any) => {

          const updatedLevels = result.levels.map((item: string) => item.replace(/,/g, ' '));
          const updatedItems = result.items.map((item: string) => item.replace(/,/g, ' '));

          this.dataSourceGrille = result.data
          this.dataLigneGrille = updatedItems
          this.dataColonneGrille = updatedLevels;
          this.api.getPlotGrille(JSON.stringify(this.dataSourceGrille), this.dataColonneGrille, this.dataLigneGrille, this.activeTheme, this.type_tableau).subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.source_img = url; // Set the plot URL
          });
          this.isLoading = false;

          this.isMessage = false;
          this.isTableau = false;
          this.isTableauGrille = false;
          this.isBarChart = false;
          this.isPieChart = false;
          this.isScatterChart = false;
          this.isLineChart = false;
          this.isOsgoodChart = false;
          this.isStarChart = false;
          this.isSatisfactionChart = false;
          this.isGrilleChart = true;
          this.isWordCloud = false;
        });
    }
  }

  showWordCloudChart(){
    this.currentChart = "wordCloudChart";
    this.switchPercentage = false;
    if (this.questionSelected != "") {
      this.isLoading = true;
      this.api.getWordCloud(this.id_questionnary, this.numQuestion).subscribe((blob) => {
        const url = URL.createObjectURL(blob);
        this.source_img = url; // Set the plot URL
        this.isLoading = false;
      });
      this.isMessage = false;
      this.isTableau = false;
      this.isTableauGrille = false;
      this.isBarChart = false;
      this.isPieChart = false;
      this.isScatterChart = false;
      this.isLineChart = false;
      this.isOsgoodChart = false;
      this.isStarChart = false;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = true;
    }
  }

  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }

  onClickTypeTableau(event: any) {
    event.target.value == "1" ? this.type_tableau = true : this.type_tableau = false;
    const typeChart = this.currentChart

    switch (typeChart) {
      case TypeChart.bar:
        this.api.getPlotBar(JSON.stringify(this.data_chart), this.activeTheme, this.type_tableau).subscribe((blob) => {
          const url = URL.createObjectURL(blob);
          this.source_img = url; // Set the plot URL
        });
        break;
      case TypeChart.pie:
        this.api.getPlotPie(JSON.stringify(this.data_chart), this.activeTheme, this.type_tableau).subscribe((blob) => {
          const url = URL.createObjectURL(blob);
          this.source_img = url; // Set the plot URL
        });
        break;
      case TypeChart.line:

        break;
      case TypeChart.scatter:

        break;
      case TypeChart.osgood:

        break;
      case TypeChart.notation:
        const valuesArray: number[] = Object.values(this.data_chart);
        const max_stars = Object.keys(this.data_chart).length;
        const star_size: string = "20";
        this.api.getPlotNotation(valuesArray, this.activeTheme, max_stars, star_size, this.type_tableau).subscribe((blob) => {
          const url = URL.createObjectURL(blob);
          this.source_img = url; // Set the plot URL
        });
        break;
      case TypeChart.satisfaction:
        const data: number[] = Object.values(this.data_chart.occurrences);
        this.api.getPlotSatisfaction(data, this.data_chart.niveaux, this.activeTheme, this.type_tableau).subscribe((blob) => {
          const url = URL.createObjectURL(blob);
          this.source_img = url; // Set the plot URL
        });
        break;
      case TypeChart.grille:
        this.api.getPlotGrille(JSON.stringify(this.dataSourceGrille), this.dataColonneGrille, this.dataLigneGrille, this.activeTheme, this.type_tableau).subscribe((blob) => {
          const url = URL.createObjectURL(blob);
          this.source_img = url; // Set the plot URL
        });
        break;
    }
  }

  showReport() {

    this.switchPercentage = true;
    if (this.questionSelected != "") {
      this.api.getReport(this.id_questionnary, this.numQuestion).subscribe(
        (result:any) => {
          this.images = result.images; // Assign images to the component variable
          });
          // this.data_chart = result;
          // this.api.getPlotBar(JSON.stringify(this.data_chart), this.activeTheme, this.type_tableau).subscribe((blob) => {
          //   const url = URL.createObjectURL(blob);
          //   this.source_img = url; // Set the plot URL
          // });
      
      this.isMessage = false;
      this.isTableau = false;
      this.isTableauGrille = false;
      this.isBarChart = false;
      this.isPieChart = false;
      this.isScatterChart = false;
      this.isLineChart = false;
      this.isOsgoodChart = false;
      this.isStarChart = false;
      this.isSatisfactionChart = false;
      this.isGrilleChart = false;
      this.isWordCloud = false;
    }
  }

  saveCommentaire(){
    if (this.questionSelected != "") {
      if (this.commentaire != ""){ 
        if (this.id_commentaire == undefined) {
          this.api.saveCommentaire(this.id_questionnary, this.numQuestion, this.commentaire).subscribe(
            (result: any) => {
              this.id_commentaire = result
              console.log("commentaire ajouté. Référence : "+this.id_commentaire)
            });
        } else {
          this.api.updateCommentaire(this.id_questionnary, this.numQuestion, this.commentaire).subscribe(
            (result: any) => {
              if(result=="Update query executed successfully."){
                console.log("commentaire mis à jour.")
              }
            });
        };

        }
      }
    }

}