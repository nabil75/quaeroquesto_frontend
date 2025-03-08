import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // BehaviorSubject will hold the current theme value and emit changes
  private activeThemeSubject = new BehaviorSubject<string>('dark');
  activeTheme$ = this.activeThemeSubject.asObservable();

  // Method to change the theme
  changeTheme(theme: string) {
    this.activeThemeSubject.next(theme); // Emit the new theme
  }

  // Optional getter to get the current theme value
  get activeTheme(): string {
    return this.activeThemeSubject.getValue();
  }
}