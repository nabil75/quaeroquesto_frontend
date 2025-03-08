import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../services/theme.service';
import { CustomPaginatorIntlService } from '../services/custom-paginator-intl.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


export interface Questionnary {
  position: string;
  intitule: string;
  date: string;
  actions: string;
  nombre_questions: number;
}

@Component({
    selector: 'app-my-questionnary',
    templateUrl: './my-questionnary.component.html',
    styleUrls: ['./my-questionnary.component.scss'],
    standalone: true,
    imports: [
      MatTableModule, MatSortModule, RouterLink, MatPaginatorModule, DatePipe, NgIf, TranslateModule
    ],
    providers: [
      { provide: MatPaginatorIntl, useClass: CustomPaginatorIntlService }
    ]
})

export class MyQuestionnaryComponent implements OnInit{
  displayedColumns = ['position', 'intitule', 'nombre_questions', 'date', 'actions'];
  dataSource!: MatTableDataSource<Questionnary>;
  questionnaries!: any;
  idRow!: any;
  status!: string;
  showImage: boolean=true;
  path_img_modify: string="assets/images/quaero/crayon_blanc.png";
  path_img_entry: string="assets/images/quaero/saisie_blanc.png";
  path_img_delete: string="assets/images/quaero/corbeille_blanc.png";
  path_img_analyse: string="assets/images/quaero/analyse_blanc.png";
  path_img_rapport: string="assets/images/quaero/rapport_blanc.png";
  activeTheme: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentLanguage!:string;

  constructor(private api: ApiService,
              public sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private themeService: ThemeService,
              public dialog: MatDialog
              ) { }

  ngOnInit() {
    this.subscribeToThemeChanges();
  }

  ngAfterViewInit() {
    this.getQuestionnaries();
    this.translate.onLangChange.subscribe(() => {
      const id = this.route.snapshot.paramMap.get('titre');
      if(id != null){
        this.translate.get('my_questionnary.choose_questionnary').subscribe( (text: string) => {
          this.status = text;
        });
        this.showImage=false;
      }else{
        this.translate.get('my_questionnary.my_questionnaries').subscribe( (text: string) => {
          this.status = text;
        });
        this.showImage=true;
      }
    });
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
      this.path_img_modify = "assets/images/quaero/crayon_blanc.png";
      this.path_img_entry="assets/images/quaero/saisie_blanc.png";
      this.path_img_delete="assets/images/quaero/corbeille_blanc.png";
      this.path_img_analyse="assets/images/quaero/analyse_blanc.png";
      this.path_img_rapport="assets/images/quaero/rapport_blanc.png";
    } else {
      this.path_img_modify = "assets/images/quaero/crayon_noir.png";
      this.path_img_entry="assets/images/quaero/saisie_noir.png";
      this.path_img_delete="assets/images/quaero/corbeille_noir.png";
      this.path_img_analyse="assets/images/quaero/analyse_noir.png";
      this.path_img_rapport="assets/images/quaero/rapport_noir.png";
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getQuestionnaries = () => {
    this.api.getAllQuestionnary().subscribe(
      (data) => {
        this.questionnaries = data.map((item: { intitule: string; }) => ({...item, intitule: decodeURIComponent(item.intitule).replace(/''/g, "'")
        }));
        this.dataSource = new MatTableDataSource(this.questionnaries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  deleteRow(idRow: any, intitule: string) {
      let message_confirmation = '';
      this.translate.get('commons.confirmation_suppression_questionnaire').subscribe((text: string) => {
        message_confirmation = text + " \n("+ intitule + ")";
      });
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '25vw',
        data: { message:  message_confirmation}
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // Ajoutez ici la logique pour supprimer l'élément
          this.api.deleteQuestionnary(idRow).subscribe(() =>{
            this.getQuestionnaries();
          });
          
        }
      });
  }


}

