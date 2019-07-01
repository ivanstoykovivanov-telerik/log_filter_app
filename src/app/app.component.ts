import { Component, PipeTransform } from '@angular/core';
import { Country } from './Country';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { LogService } from './log.service';

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  }); 
}
 

const COUNTRIES: Country[] = [
  {
    name: 'Log1',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Log2',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Log3',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'Log4',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  events : []; 
  allLogs; 
  countries$ : Observable<Country[]>; 
  filter = new FormControl('');
  private startTime; 
  private endTime; 
  private startDate; 
  private endDate; 
  angForm: FormGroup;
  //private logsObservable : Observable<any[]> ; 
  private logs; 

  constructor(
    private logService : LogService, 
    private fb: FormBuilder,
    pipe: DecimalPipe, 
    ){
      this.createForm(); 
    //Example from tutorial
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(){
    this.getLogs(); 
    this.getBinary(); 
  }

  createForm(){
    this.angForm = this.fb.group({

    })
  }

  getLogs(){
    this.logService.getLogs().subscribe(
      (res: any) => {  
        this.events = res.events[0];
         
            console.log("EVENTS:  ");
            console.log(res.events[0]);
            console.log(res.events[0].c8y_LogMetadata);
  
            console.log("id: ", res.events[0].id);
            console.log("time: ", res.events[0].time);
            console.log("text: ", res.events[0].text);
            console.log("link: ", res.events[0].self);
            console.log("type: ", res.events[0].type);
    }); 
  }

  getBinary(){
    this.logService.getBinary().subscribe(
      (res: any) => {
        this.createJsonFromBinary(res)
      }
    ) 
  }

  createJsonFromBinary(binary : Blob){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.allLogs = fileReader.result; 
    }
    let result = fileReader.readAsText(binary);
    
  }

  onClickFind(startTime, endTime, startDate, endDate){
    console.log("Time: ");
    console.log(startTime);
    console.log(endTime);
    
    console.log("Date :");
    console.log(startDate._inputValue);
    console.log(endDate._inputValue);

    startTime = this.fixTime(startTime) ; 
    endTime = this.fixTime(endTime) ;

    console.log(startTime);
    console.log(endTime);

    let dateFrom : string =  `${startDate._inputValue}T${startTime.hour}:${startTime.minute}:${startTime.second}%2B03:00` ; 
    let dateTo : string =  `${endDate._inputValue}T${endTime.hour}:${endTime.minute}:${endTime.second}%2B03:00` ; 
    
    console.log(dateFrom);
    console.log(dateTo);

    const timeObj = {
      dateTo : dateTo,
      dateFrom : dateFrom
    }; 
    
    this.getBinaryFinal(timeObj); 
  }

  getBinaryFinal(time: {dateTo, dateFrom}){
    this.logService.getLogsFinal(time.dateTo, time.dateFrom).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.events[0]);
        console.log(res.events[0].c8y_IsBinary.name);
        this.createJsonFromBinary(res)
      }
    ) 
  }

  removeFirstZero(num){
    num = num.toString(num)
    console.log(num.charAt(0));
    if(num.charAt(0) === '0' ){
      return num.substr(1); 
    }
  }
  
  fixTime(time){
    this.removeFirstZero(time); 
    
    if(time.hour < 10){
      this.removeFirstZero(time.hour); 
      time.hour = `0${time.hour}`; 
    }
    
    if(time.minute < 10){
      this.removeFirstZero(time.minute); 
      time.minute = `0${time.minute}`; 
    }

    if(time.second < 10){
      this.removeFirstZero(time.second); 
      time.second = `0${time.second}`; 
    }

    return time; 
  }
}
