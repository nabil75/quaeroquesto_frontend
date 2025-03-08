import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-edit-ouverte',
  standalone: true,
  imports: [CommonModule, FormsModule, AutosizeModule],
  templateUrl: './edit-ouverte.component.html',
  styleUrl: './edit-ouverte.component.scss'
})
export class EditOuverteComponent {
  typeComponent: string="EditOuverteComponent";
  componentId: any;
  libelleQuestion = "";
  reponseQuestion: string="";

  constructor(private utilsService: UtilsService,){
    this.componentId = this.utilsService.generateUniqueId();
  }

}
