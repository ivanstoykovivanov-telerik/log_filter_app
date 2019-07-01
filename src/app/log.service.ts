import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const username = "" ; 
const password = "" ; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  })
};

const httpOptionsBinary = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  }), 
  responseType : "blob" as "json"
};


@Injectable({
  providedIn: 'root'
})
export class LogService { 
  
  
  // FIRST 
  private firstRequest : string = "https://adamosoeedev.adamos-dev.com/inventory/managedObjects?pageSize=100&type=c8y_Application_6447&withTotalPages=true"; 
  private secondRequest: string = "https://adamosoeedev.adamos-dev.com/event/events"; 
  private dateFrom = "2019-06-06T16:33:52%2B03:00"; 
  private dateTo = "2019-06-06T16:43:52%2B03:00" ; 
  private fragmentType: string = "c8y_Instance";
  private fragmentValue :string = "apama-oeeapp-scope-t44680917-deployment-7894c5b96-mnclx";    
  private pageSize: number = 100; 
  private source: number = 3637;
  private type = "c8y_LogfileRequest"; 
  private obj ; 

  constructor(
    private httpClient: HttpClient  
  ) { }

  getLogs() {
    let secondRequestN =  `${this.secondRequest}?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&fragmentType=${this.fragmentType}&fragmentValue=${this.fragmentValue}&pageSize=${this.pageSize}&source=${this.source}&type=${this.type}` ; 
     //Second reuqest
     return this.httpClient.get(secondRequestN, httpOptions); 
  }

  getBinary() {
   return this.httpClient.get("https://adamosoeedev.adamos-dev.com/event/events/63281/binaries", httpOptionsBinary ); 
  } 

}

