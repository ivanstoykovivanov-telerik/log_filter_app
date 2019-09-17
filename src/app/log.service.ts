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

  /* 
      Returns an array of {logEvent, logString} objects
  */
 async fetchLogs(dateTo, dateFrom){
  let eventsRequest = 
  `https://adamosoeedev.adamos-dev.com/event/events?dateTo=${dateTo}&source=3637&dateFrom=${dateFrom}&type=c8y_LogfileRequest&pageSize=100&currentPage=1`; 
  
  let eventsResponse:any = await this.httpClient.get(eventsRequest, httpOptions).toPromise();
      
  let logPromises:Array<Promise<any>> = eventsResponse.events.map((event:any)=> {
    return this.eventToLog(event); 
  });

  let logs:any = await Promise.all(logPromises);      

  return logs;
}	

async eventToLog(event:any){
  let binaryRequest =  `https://adamosoeedev.adamos-dev.com/event/events/${event.c8y_IsBinary.name}/binaries`;
  try {
    let blob:Blob = await this.httpClient.get(binaryRequest, httpOptionsBinary ).toPromise() as Blob;
    let logString = await this.blobToString(blob);
    return {event, logString};
    //console.log(logString);      
  } catch (e) {
    console.log('error getting events: ' + e);      
    return null;
  }    
}

blobToString(blob:Blob){
  let blobToStringPromise:Promise<String> = new Promise(function(resolve, reject) {
    let fileReader = new FileReader(); 
    fileReader.onload = (event: any) => {
      var contents = event.target.result;
      resolve(contents); 
    }
    fileReader.readAsText(blob);
  });
  return blobToStringPromise;
}

}

//TODO: see the requ in postman , and look for the events , 
// events of the source object from date to date and see which of them are log request 
// 


