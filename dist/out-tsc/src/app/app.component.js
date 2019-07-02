import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { LogService } from './log.service';
let AppComponent = class AppComponent {
    constructor(logService, fb, pipe) {
        this.logService = logService;
        this.fb = fb;
        this.filter = new FormControl('');
        this.createForm();
    }
    ngOnInit() { }
    createForm() {
        this.angForm = this.fb.group({});
    }
    createJsonFromBinary(binary) {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log(fileReader.result);
            console.log(this.parseLog(fileReader.result));
            this.allLogs = fileReader.result;
        };
        let result = fileReader.readAsText(binary);
        let changedResult = this.parseLog(result);
        //this.allLogs = result;  //old
        this.allLogs = changedResult; //old
    }
    onClickFind(startTime, endTime, startDate, endDate) {
        console.log("Time: ");
        console.log(startTime);
        console.log(endTime);
        console.log("Date :");
        console.log(startDate._inputValue);
        console.log(endDate._inputValue);
        startTime = this.fixTime(startTime);
        endTime = this.fixTime(endTime);
        console.log(startTime);
        console.log(endTime);
        let dateFrom = `${startDate._inputValue}T${startTime.hour}:${startTime.minute}:${startTime.second}%2B03:00`;
        let dateTo = `${endDate._inputValue}T${endTime.hour}:${endTime.minute}:${endTime.second}%2B03:00`;
        console.log(dateFrom);
        console.log(dateTo);
        const timeObj = {
            dateTo: dateTo,
            dateFrom: dateFrom
        };
        this.getBinaryFinal(timeObj);
    }
    getBinaryFinal(time) {
        this.logService.getLogsFinal(time.dateTo, time.dateFrom).subscribe((res) => {
            console.log(res);
            let binaryID = res.events[0].c8y_IsBinary.name;
            console.log(binaryID);
            this.logService.getBinaryFile(binaryID).subscribe((res) => {
                this.createJsonFromBinary(res);
            });
        });
    }
    removeFirstZero(num) {
        let number = num.toString();
        if (number.charAt(0) === '0') {
            return number.substr(1);
        }
    }
    fixTime(time) {
        if (Number(time.hour < 10)) {
            this.removeFirstZero(time.hour);
            time.hour = `0${time.hour}`;
        }
        if (Number(time.minute < 10)) {
            this.removeFirstZero(time.minute);
            time.minute = `0${time.minute}`;
        }
        if (Number(time.second < 10)) {
            this.removeFirstZero(time.second);
            time.second = `0${time.second}`;
        }
        return time;
    }
    parseLog(result) {
        // const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        // const found = 
        const resultChanged = result.replace("2019", "<br>2019");
        console.log(resultChanged);
        return resultChanged;
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [LogService,
        FormBuilder,
        DecimalPipe])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map