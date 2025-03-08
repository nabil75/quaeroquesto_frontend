import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-edit-fermee-multiple',
  standalone: true,
  imports: [CommonModule, FormsModule, AutosizeModule],
  templateUrl: './edit-fermee-multiple.component.html',
  styleUrls: ['./edit-fermee-multiple.component.scss']
})
export class EditFermeeMultipleComponent {

  typeComponent: string="EditFermeeMultipleComponent";
  componentId: any;
  libelleQuestion = "";
  modalites: any ;
  maxReponses: number =0;

  constructor(private utilsService: UtilsService,){
    this.componentId = this.utilsService.generateUniqueId();
  }
}
