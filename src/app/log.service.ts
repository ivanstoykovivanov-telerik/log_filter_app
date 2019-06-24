import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private baseUrl : string = "https://adamosoeedev.adamos-dev.com/inventory/managedObjects?pageSize=100&type=c8y_Application_6447&withTotalPages=true"; 


  constructor(
    private httpClient: HttpClient  
  ) { }

  getLogs(){
    this.httpClient.get(this.baseUrl).subscribe((res)=>{
      console.log(res);
    })
  }


}
  