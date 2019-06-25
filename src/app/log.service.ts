import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



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
    //First request: 
    let secondRequestN =  `${this.secondRequest}?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&fragmentType=${this.fragmentType}&fragmentValue=${this.fragmentValue}&pageSize=${this.pageSize}&source=${this.source}&type=${this.type}` ; 
    
    // this.httpClient.get(this.firstRequest, httpOptions).subscribe(
    //   (res : any) => {
    //   console.log(res.managedObjects[0].c8y_Subscriptions.t44680917.instances);
    //   console.log(this.fragmentValue);
    //   let secondRequestN =  `${this.secondRequest}?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&fragmentType=${this.fragmentType}&fragmentValue=${this.fragmentValue}&pageSize=${this.pageSize}&source=${this.source}&type=${this.type}` ; 
    //   console.log(secondRequestN);

     //Second reuqest
     return this.httpClient.get(secondRequestN, httpOptions); 
      // .subscribe(
      //   (res2: any) => {  
      //     console.log("EVENTS:  ");
      //     console.log(res2.events[0]);
      //     console.log(res2.events[0].c8y_LogMetadata);

      //     console.log("id: ", res2.events[0].id);
      //     console.log("creation Time: ", res2.events[0].creationTime);
      //     console.log("time: ", res2.events[0].time);
      //     console.log("creation Time: ", res2.events[0].text);
      //     console.log("link: ", res2.events[0].self);
      //     console.log("type: ", res2.events[0].type);
          
      //     let obj = {
      //       id : res2.events[0].id, 
      //       time: res2.events[0].time,
      //       link: res2.events[0].self, 
      //       type: res2.events[0].type 
      //     }
      //     console.log(obj);
      //     return obj;  
      //     // {
      //     //   id : res2.events[0].id, 
      //     //   time: res2.events[0].time,
      //     //   link: res2.events[0].self, 
      //     //   type: res2.events[0].type 
      //     // }
    // }); 
  // })
  }

}

