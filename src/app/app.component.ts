import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title: string = "quaeroquesto"
  // title(title: any) {
  //   throw new Error('Method not implemented.');
  // }

  language = 'fr';
  path_img_menu: string = "";
  activeTheme: string = "";

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService
  ) { translate.setDefaultLang('fr'); }

  ngOnInit(): void {
    this.activeTheme = this.themeService.activeTheme;
    this.setDarkTheme();
  }
  ngAfterViewInit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.activeTheme === 'dark' ? this.setDarkTheme() : this.setLightTheme();
  }
  switchToEnglish(): void {
    this.language = 'en';
    this.translate.use(this.language)
  }
  switchToFrench(): void {
    this.language = 'fr';
    this.translate.use(this.language)
  }

  // Method to switch to dark theme
  setDarkTheme() {
    document.body.classList.remove('light-theme');
    this.path_img_menu = "assets/images/menu/menu-general/menu-general-blanc.png";
    this.themeService.changeTheme('dark');
  }

  // Method to switch to light theme
  setLightTheme() {
    document.body.classList.add('light-theme');
    this.path_img_menu = "assets/images/menu/menu-general/menu-general-noir.png";
    this.themeService.changeTheme('light');
  }

}
