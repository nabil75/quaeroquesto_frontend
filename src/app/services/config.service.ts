import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any = {};
  private currentTheme: string = 'light';  // Default theme
  constructor(private http: HttpClient) {}

  // Load the configuration file on app startup
  loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json').pipe(
      tap((response) => {
        this.config = response;  // Store config data in memory
      })
    );
  }

  // Get a specific configuration value
  getConfig(key: string): any {
    return this.config[key];
  }

  // Set or update a configuration value
  setConfig(key: string, value: any): void {
    this.config[key] = value;
  }

  // Delete a specific configuration value
  deleteConfig(key: string): void {
    delete this.config[key];
  }
  // Get the current theme configuration
  getCurrentTheme(): any {
    return this.config.themes[this.currentTheme];
  }

  // Switch to a different theme by name
  switchTheme(themeName: string): void {
    if (this.config.themes[themeName]) {
      this.currentTheme = themeName;
    } else {
      console.warn(`Theme '${themeName}' does not exist`);
    }
  }
}