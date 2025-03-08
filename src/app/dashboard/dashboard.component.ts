import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WidgetComponent } from '../widget/widget.component';
import { CommonModule, NgFor } from '@angular/common';
import { Widget } from '../models/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DragDropModule, MatGridListModule, MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule, NgFor, CommonModule, WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  // data: Widget = {
  //   id: 1,
  //   label: 'Subscribers',
  //   content:
  // }



  // widgets: { type: string; data: any }[] = [];
  // addWidget(type: string) {
  //   this.widgets.push({ type, data: {} });
  // }
  // drop(event: CdkDragDrop<any[]>) {
  //   moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
  // }
}