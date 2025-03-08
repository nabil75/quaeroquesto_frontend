import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generateUniqueId(){
    const UID = new Date().getTime().toString();
    const randomNumber: string = (Math.floor(Math.random() * (999 - 100)) + 100).toString();
    const uniqueID = UID+randomNumber;
    return uniqueID
  }

}
