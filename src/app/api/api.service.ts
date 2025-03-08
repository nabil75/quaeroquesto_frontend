import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  delete() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  baseurl = "http://localhost:8001";
  httpHeaders_json = new HttpHeaders({'Content-Type':'application/json'});
  httpHeaders_text = new HttpHeaders({'Content-Type':'text/plain'});

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl+"/user", {headers: this.httpHeaders_json});
  }

  getAllQuestionnary(): Observable<any> {
    return this.http.get(this.baseurl+"/all_questionnaries", {headers: this.httpHeaders_json});
  }

  deleteQuestionnary(idRow: string){
    return (this.http.get(this.baseurl+"/delete_questionnary/"+idRow, {headers: this.httpHeaders_json}))
  }

  getQuestionnary(idQuestionnary:string): Observable<any>{
    return(this.http.get(this.baseurl+"/get_questionnary/"+idQuestionnary+"/", { headers: this.httpHeaders_json }));
  }

  updateQuestionnary(id_questionnary: string, content: any ){
    const encodedParam = encodeURIComponent(content);
    return (this.http.get(this.baseurl+`/update_questionnary/`+id_questionnary+`/${encodedParam}`, {headers: this.httpHeaders_json} ))
  }
  saveQuestionnary(content: any){
    const encodedParam = encodeURIComponent(content);
    return (this.http.get(this.baseurl+`/save_questionnary/${encodedParam}`, {headers: this.httpHeaders_json} ))
  }

  getToken():any{
    return this.http.get(this.baseurl+"/api/get_csrf_token");
  }

  getCsrfToken():any {
    return this.http.get<any>(this.baseurl+'/api/get_csrf_token');
  }

  insertResult(content: any, idQuestionnary: number ): Observable<any>{
    return (this.http.get(this.baseurl+"/insert_result/"+content+"/"+idQuestionnary, {headers: this.httpHeaders_json} ))
  }

  getResultsFermee(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_results_fermee/"+id_questionnary+"/"+i));
  }
 
  getResultsEchelle(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_results_echelle/"+id_questionnary+"/"+i));
  }
  getResultsNotation(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_results_notation/"+id_questionnary+"/"+i));
  }
  getResultsSatisfaction(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_results_satisfaction/"+id_questionnary+"/"+i));
  }
  getResultsGrille(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_results_grille/"+id_questionnary+"/"+i));
  }

  getQuestionFromLmstudio(){
    return this.http.get<any>(this.baseurl+'/get_libelle_question');
  }

  getfunction_to_target(model: string){
    let model_to_target = '';
    switch (model) {
      case 'gpt-4o-mini':
      case 'gpt-4o':
      case 'o1-preview':
        model_to_target = 'chatgpt';
        break;
      case 'mistral-large-latest':
        model_to_target = 'mistral';
        break;
      case 'Meta-Llama-3.1-8B-Instruct-Turbo':
      case 'Meta-Llama-3.3-70B-Instruct-Turbo':
        model_to_target = 'llama';
        break;
    }
    return model_to_target;
  }

  getCadreEtude(cadre_etude: string, model: string){
    const model_to_target = this.getfunction_to_target(model);
    return this.http.get<any>(this.baseurl+"/get_auto_contexte_"+model_to_target+"/"+cadre_etude+"/"+model);
  }

  getThemes(role: string, objet_comprendre: string, objet_mesurer: string, finalite: string, model: string){
    const model_to_target = this.getfunction_to_target(model);
    return this.http.get<any>(this.baseurl+'/get_auto_themes_'+model_to_target+'/'+role+'/'+objet_comprendre+'/'+objet_mesurer+'/'+finalite+'/'+model);
  }

  getQuestionnaire_automatique(role: string, objet_comprendre: string, objet_mesurer: string, finalite: string, selectedThemes: any, model: string){
    const model_to_target = this.getfunction_to_target(model);
    return this.http.get<any>(this.baseurl+'/get_auto_questionnary_'+model_to_target+'/'+role+'/'+objet_comprendre+'/'+objet_mesurer+'/'+finalite+'/'+selectedThemes+'/'+model);
  }

  saveAutomaticProposition(cadre_etude: string, role: string, objet_comprendre: string, objet_mesurer: string, finalite: string, themes: any){
    return this.http.get<any>(this.baseurl+'/save_auto_proposition/'+cadre_etude+'/'+role+'/'+objet_comprendre+'/'+objet_mesurer+'/'+finalite+'/'+JSON.stringify(themes));
  }

  getModalitesFromLmstudio(libelle_question:string){
    return this.http.get<any>(this.baseurl+'/get_modalites_question/'+libelle_question);
  }

  getOrganigramme(){
    return this.http.get<any>(this.baseurl+'/get_organigramme/');
  }
  getPlotBar(data:any, theme: any, type_tableau:any){
    return this.http.get('http://localhost:8001/plot_bar/'+data+"/"+theme+"/"+type_tableau, { responseType: 'blob' });
  }
  getPlotPie(data:any, theme:any, type_tableau: any){
    return this.http.get('http://localhost:8001/plot_pie/'+data+"/"+theme+"/"+type_tableau, { responseType: 'blob' });
  }

  getPlotLine(data:any){
    return this.http.get('http://localhost:8001/plot_line/'+data, { responseType: 'blob' });
  }
  getPlotOsgood(data: any, semantiqueGauche: any, semantiqueDroite: any, theme: string){
    return this.http.get('http://localhost:8001/get_plot_osgood/'+data+'/'+semantiqueGauche+'/'+semantiqueDroite+'/'+theme,  { responseType: 'blob'});
  }
  getPlotNotation(results: any, max_stars: any, star_size: any, theme: string, type_tableau:boolean){
    return this.http.get('http://localhost:8001/get_plot_notation/'+results+'/'+max_stars+'/'+star_size+'/'+theme+'/'+type_tableau,  { responseType: 'blob'});
  }

  getPlotSatisfaction(data: any, satisfaction_levels: any, theme: string, type_tableau:boolean){
    return this.http.get('http://localhost:8001/get_plot_satisfaction/'+data+'/'+satisfaction_levels+'/'+theme+'/'+type_tableau,  { responseType: 'blob'});
  }

  getPlotGrille(data: any, levels: any, items: any, theme: string, type_tableau:boolean){
    return this.http.get('http://localhost:8001/get_plot_grille/'+data+'/'+levels+'/'+items+'/'+theme+"/"+type_tableau, { responseType: 'blob'});
  }

  getWordCloud(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_plot_wordcloud/"+id_questionnary+"/"+i, { responseType: 'blob'}));
  }

  getTypeQuestion(id_questionnary: number, num_question: string){
    return(this.http.get(this.baseurl+"/get_type_question/"+id_questionnary+"/"+num_question));
  }

  getReport(id_questionnary: number, num_question: string){
    return(this.http.get(this.baseurl+"/get_report/"+id_questionnary+"/"+num_question));
  }
  saveCommentaire(id_questionnary: number, num_question: string, commentaire: string){
    const comment = encodeURIComponent(commentaire);
    return(this.http.get(this.baseurl+`/save_commentaire/`+id_questionnary+`/`+num_question+`/${comment}`, {headers: this.httpHeaders_json}));
  }
  updateCommentaire(id_questionnary: number, num_question: string, commentaire: string){
    const comment = encodeURIComponent(commentaire);
    return(this.http.get(this.baseurl+`/update_commentaire/`+id_questionnary+`/`+num_question+`/${comment}`, {headers: this.httpHeaders_json}));
  }
  getComment(id_questionnary: number, num_question: string){
    return(this.http.get(this.baseurl+"/get_commentaire/"+id_questionnary+"/"+num_question));
  }

}
