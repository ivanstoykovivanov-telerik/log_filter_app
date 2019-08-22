import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import  * as credentials from  './credentials';

//Credentials for Login: 
const username = credentials.username ; 
const password = credentials.password ; 

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
  
  private fragmentValue :string = "apama-oeeapp-scope-t44680917-deployment-5cc65d4f5f-ntdb9";   //TODO: inspect ! 
  //java oee bundle TODO: output is always there  
 
  constructor(
    private httpClient: HttpClient  
  ) { }

  
  /*
  * 
  */
  getBinaryFileContent(binaryID){
    let requestN =  `https://adamosoeedev.adamos-dev.com/event/events/${binaryID}/binaries`; 
    
    return this.httpClient.get(requestN, httpOptionsBinary ); 
  }


  getLogs(dateTo, dateFrom){
    let secondRequestN = 
    `https://adamosoeedev.adamos-dev.com/event/events?dateTo=${dateTo}&source=3637&dateFrom=${dateFrom}&type=c8y_LogfileRequest&pageSize=100&currentPage=1`; 

    console.log(secondRequestN);
    return this.httpClient.get(secondRequestN, httpOptions); 
  }

}

//TODO: see the requ in postman , and look for the events , 
// events of the source object from date to date and see which of them are log request 
// 


