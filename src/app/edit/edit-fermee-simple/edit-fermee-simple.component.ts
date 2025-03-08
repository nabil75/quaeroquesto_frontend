import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-edit-fermee-simple',
  standalone: true,
  imports: [CommonModule, FormsModule, AutosizeModule],
  templateUrl: './edit-fermee-simple.component.html',
  styleUrls: ['./edit-fermee-simple.component.scss']
})
export class EditFermeeSimpleComponent {

  typeComponent: string="EditFermeeSimpleComponent";
  componentId: any;
  libelleQuestion = "";
  modalites: any;
  content: string = "";

  constructor(private utilsService: UtilsService,){
    this.componentId = this.utilsService.generateUniqueId();
  }

  onClickInput(event: any){
    this.content="";
    const id=(event.target.id).split("_");
    this.content = id[1];
  }
}
