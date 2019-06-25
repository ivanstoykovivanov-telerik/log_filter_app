import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  })
};

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  // FIRST 
  private baseUrl : string = "https://adamosoeedev.adamos-dev.com/inventory/managedObjects?pageSize=100&type=c8y_Application_6447&withTotalPages=true"; 
  private second : string =   "https://adamosoeedev.adamos-dev.com/event/events?dateFrom=2019-06-06T16:33:52%2B03:00&dateTo=2019-06-06T16:43:52%2B03:00&fragmentType=c8y_Instance&fragmentValue=apama-oeeapp-scope-t44680917-deployment-7894c5b96-mnclx&pageSize=100&source=3637&type=c8y_LogfileRequest" ; 
  private secondRequest: string = "https://adamosoeedev.adamos-dev.com/event/events"; 
  private parameterToSecondRequest: string; 
  private dateFrom = "2019-06-06T16:33:52%2B03:00"; 
  private dateTo = "2019-06-06T16:43:52%2B03:00" ; 
  private fragmentType: string = "c8y_Instance";
  private fragmentValue :string = "apama-oeeapp-scope-t44680917-deployment-7894c5b96-mnclx";    
  private pageSize: number = 100; 
  private source: number = 3637;
  private type = "c8y_LogfileRequest"; 

  private readyUrl : string = `${this.baseUrl}events?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&fragmentType=${this.fragmentType}&fragmentValue=${this.fragmentValue}&pageSize=${this.pageSize}&source=${this.source}&type=${this.type}`; 
  
  
  //SECOND
 // private baseUrl : string =  "https://adamosoeedev.adamos-dev.com/event/events?dateFrom=2019-06-06T16:33:52%2B03:00&dateTo=2019-06-06T16:43:52%2B03:00&fragmentType=c8y_Instance&fragmentValue=apama-oeeapp-scope-t44680917-deployment-7894c5b96-mnclx&pageSize=100&source=3637&type=c8y_LogfileRequest"; 
  //private baseUrl : string = "https://adamosoeedev.adamos-dev.com/inventory/"; 


  constructor(
    private httpClient: HttpClient  
  ) { }

  getLogs(){
    this.httpClient.get(this.baseUrl, httpOptions).subscribe(
      (res : any) => {
      // console.log(res);
      // console.log(res.managedObjects[0].c8y_Subscriptions);
      
      console.log(res.managedObjects[0].c8y_Subscriptions.t44680917.instances);
     // this.fragmentValue = res.managedObjects[0].c8y_Subscriptions.t44680917.instances ; 
      console.log(this.fragmentValue);
                              //https://adamosoeedev.adamos-dev.com/event/events?dateFrom=2019-06-06T16:33:52%2B03:00&dateTo=2019-06-06T16:43:52%2B03:00&fragmentType=c8y_Instance&fragmentValue=apama-oeeapp-scope-t44680917-deployment-7894c5b96-mnclx&pageSize=100&source=3637&type=c8y_LogfileRequest
      let secondRequestN =   `${this.secondRequest}?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&fragmentType=${this.fragmentType}&fragmentValue=${this.fragmentValue}&pageSize=${this.pageSize}&source=${this.source}&type=${this.type}` ; 
      console.log(secondRequestN);

      //Second
      this.httpClient.get(secondRequestN, httpOptions).subscribe(
        (res2: any) => { 
          console.log("Second request: ");
          console.log(res2);
          console.log("EVENTS:  ");
          console.log(res2.events[0]);
    }); 
  })
  }

}

