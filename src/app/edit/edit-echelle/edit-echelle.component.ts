import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { UtilsService } from 'src/app/services/utils.service';
import { AutosizeModule } from 'ngx-autosize';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-edit-echelle',
  standalone: true,
  imports: [CommonModule, MatSliderModule, AutosizeModule, FormsModule],
  templateUrl: './edit-echelle.component.html',
  styleUrls: ['./edit-echelle.component.scss']
})
export class EditEchelleComponent {

  typeComponent: string="EditEchelleComponent";
  componentId: any;
  libelleQuestion = "";
  semantiques: any;
  sliderValues: any = {};
  sliderColor: any ="warn";
  activeTheme: string = "";

  constructor(private utilsService: UtilsService,
              private themeService : ThemeService
  )
   {
    this.componentId = this.utilsService.generateUniqueId();
  }

  ngOnInit(): void {
    this.subscribeToThemeChanges();
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
        this.sliderColor= "warn";
      } else {
        this.sliderColor= "primary";
      }
    }

  change_note(event: any) {
    const sliderValue = event.target.getAttribute('aria-valuetext');
    const sliderId = event.target.getAttribute('id');
    if (sliderId in this.sliderValues) {
      this.sliderValues[+sliderId + 1] = sliderValue;
    } else {
      this.sliderValues[+sliderId + 1] = sliderValue;
    }
  }
}