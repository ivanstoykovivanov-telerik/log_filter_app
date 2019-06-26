import { Component, PipeTransform } from '@angular/core';
import { Country } from './Country';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { LogService } from './log.service';
import { ThrowStmt } from '@angular/compiler';

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
  countries$ : Observable<Country[]>; 
  filter = new FormControl('');
  //private logsObservable : Observable<any[]> ; 
  private logs; 

  constructor(
    pipe: DecimalPipe, 
    private logService : LogService
    ){
   
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
        console.log(typeof res);
      }
    ) 
  }

}
