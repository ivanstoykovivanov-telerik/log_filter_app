import { Component, ViewEncapsulation, PipeTransform } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LogService } from './log.service';
import { Log } from './Log';
import { DecimalPipe } from '@angular/common';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  startTime: string = ""; 
  endTime: string = ""; 
  
  logs : Log[];
  filter = new FormControl('');
  angForm: FormGroup;
  private startDate: string; 
  private endDate: string; 
  pipe: DecimalPipe; 
  logs$: Observable<Log[]>;                  //TODO: Add later for filtering the contets of the log


  constructor(
    pipe: DecimalPipe, 
    private logService : LogService, 
    private fb: FormBuilder,
    ){
      this.createForm(); 
      //this.logs$ = this.filter.valueChanges.pipe(startWith(''), map(text => this.search(text, pipe)));
  }


  ngOnInit(){}


  createForm(){
    this.angForm = this.fb.group({
    })
  }


  displayBinary(binary : Blob){
    let fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      var contents = event.target.result;
      
      //parse to html:  
      this.parseLog(contents); 
    }
    fileReader.readAsText(binary);
  }


  onClickFind(startTime, endTime, startDate, endDate){
    this.logs = []; 
       
    let adaptedStartTime = this.adapt(startTime); 
    let adaptedEndTime = this.adapt(endTime); 
        
    let dateFrom : string =  `${startDate._inputValue}T${adaptedStartTime}%2B03:00` ; 
    let dateTo : string =  `${endDate._inputValue}T${adaptedEndTime}%2B03:00` ; 
        
    const timeObj = {
      dateTo : dateTo,
      dateFrom : dateFrom
    }; 
    
   // this.getLogs(timeObj);   //OLD version == working
   this.fetchLogs(timeObj);   // MISHO's version
  }


 /*
 *  Fetch the logs between start and end date. 
 */
 fetchLogs(time: {dateTo, dateFrom}){
  this.logService.getLogs(time.dateTo, time.dateFrom).subscribe(
    (res: any) => {
      let ids: number[] = [];
      for (let event of res.events){
        ids.push(Number(event.id));       
      }
      ids.sort(); 
      for( let id of ids){
        console.log(id);
        this.getBinaryFileContent(id);
      }
      console.log(ids);
    }
  )
 }


 /*
 *  Get the contents of a binary file 
 */
 getBinaryFileContent(binaryId: number){
   this.logService.getBinaryFileContent(binaryId).subscribe(
          (res: any) => {
            this.displayBinary(res); 
          }
         ) 
 }


  /*
  * Gets the binaryID based on the date and time.  
  * In the second request gets contents of the logs from the binary file. 
  *  
  * @param {object} containing the start date and time and the end date and time , given by the user
  */
  getLogs(time: {dateTo, dateFrom}){
    this.logService.getLogs(time.dateTo, time.dateFrom).subscribe(
      (res: any) => {
       console.log(res);
       let binaryID = res.events[0].c8y_IsBinary.name ;  //TODO:  take all the events and fetch the bin id.   //check if it exists
       console.log(binaryID);
       
       this.logService.getBinaryFileContent(binaryID).subscribe(
        (res: any) => {
          this.displayBinary(res); 
        }
       ) 
      }
    ) 
  }
 
  
  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }
  

  /*
  ** Adapt the time from the user gives to 00:00:00 format
  *@param {string} time from the html component   
  */
  adapt(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }


  /*
  ** Converts the text logs into html content
  *@param {string} result  from the html component   
  */
  parseLog(result){
    // Logs displayed in "Unordered logs" section of the html
    const resultChanged = result.replace(/2019/g, "<br /><br /><span class='bg-primary text-white'>2019</span>"); 

    //Search Date : 
    const regex = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/g;
    let m;                //  every date found in the string of all logs
    let arrIndices = []; 
    let currentIndex = 0; 
    let lastIndex = 0; 
    let logs : Log[] = [];

    while ((m = regex.exec(result)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      arrIndices.push(m);
      
      if(m.index !== 0 ){
        lastIndex = currentIndex;
        currentIndex = m.index; 
        
        //LOG: 
        let currentLog = result.slice(lastIndex,currentIndex); 
        let logElements = currentLog.split(" ");
        const contents : string[] = logElements.slice(4, logElements[length-1]);
        
        //TODO:  a log as a single string, 

        //a single log : 
        const logAsObj = new Log(logElements[0], logElements[1], logElements[2], contents ); 
        logs.push(logAsObj); 
      }

      currentIndex = m.index;
      
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
    }
  
    console.log(logs);
    for (let log of logs) {
      
      //TODO: check if the log exists in this.logs, 
      // 
      // Sort by the date of the logs  
      console.log(log);
      this.logs.push(log); 
    }
    //this.logs.concat(logs);
    console.log("sum of logs:");
    console.log(this.logs);
    
    this.logs$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    )

    return resultChanged; 
  }
  

  checkIfLogIsAlreadyAdded(log : Log){
        
    if(!this.logs.includes(log)){

    }
  }


  /*
  * Searches through the logs
  */
  search(text: string): Log[]{
    
      //TODO: Inspect search contents element functionality
    return this.logs.filter(log => {
      const term = text.toLowerCase();
      
      return log.date.includes(term) 
        || log.time.includes(term) 
        || log.type.toLowerCase().includes(term)
        || log.contents.includes(term) ; 
    })
  }


  /*
  * Helper function 
  * Checks equality of objects  
  */
  isEquivalent(a: Log, b: Log){
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // objects are equivalent: 
    return true;  
  }

}