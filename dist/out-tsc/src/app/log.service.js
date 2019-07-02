import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as credentials from './credentials';
const username = credentials.username;
const password = credentials.password;
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    })
};
const httpOptionsBinary = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    }),
    responseType: "blob"
};
let LogService = class LogService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.firstRequest = "https://adamosoeedev.adamos-dev.com/inventory/managedObjects?pageSize=100&type=c8y_Application_6447&withTotalPages=true";
        this.secondRequest = "https://adamosoeedev.adamos-dev.com/event/events";
        this.dateFrom = "2019-07-01T11:02:37%2B03:00";
        this.dateTo = "2019-07-01T11:12:37%2B03:00";
        this.fragmentType = "c8y_Instance";
        this.fragmentValue = "apama-oeeapp-scope-t44680917-deployment-5cc65d4f5f-ntdb9";
        this.type = "c8y_LogfileRequest";
        this.pageSize = 100;
        this.source = 3637;
    }
    getLogsFinal(dateTo, dateFrom) {
        let secondRequestN = `https://adamosoeedev.adamos-dev.com/event/events?fragmentValue=${this.fragmentValue}&dateTo=${dateTo}&fragmentType=c8y_Instance&source=3637&dateFrom=${dateFrom}&type=c8y_LogfileRequest&pageSize=100&currentPage=1`;
        //                       https://adamosoeedev.adamos-dev.com/event/events?dateFrom=2019-07-01T15:33:18%2B03:00&dateTo=2019-07-01T15:43:18%2B03:00&fragmentType=c8y_Instance&fragmentValue=apama-oeeapp-scope-t44680917-deployment-5cc65d4f5f-ntdb9&pageSize=100&source=3637&type=c8y_LogfileRequest
        //                       https://adamosoeedev.adamos-dev.com/event/events?dateFrom=2019-07-01T15:20:18%2B03:00&dateTo=2019-07-01T15:33:18%2B03:00&fragmentType=c8y_Instance&fragmentValue=apama-oeeapp-scope-t44680917-deployment-5cc65d4f5f-ntdb9&pageSize=100&source=3637&type=c8y_LogfileRequest
        //First reuqest
        console.log(secondRequestN);
        return this.httpClient.get(secondRequestN, httpOptions);
        //Second Request
    }
    getBinaryFile(binaryID) {
        let requestN = `https://adamosoeedev.adamos-dev.com/event/events/${binaryID}/binaries`;
        return this.httpClient.get(requestN, httpOptionsBinary);
    }
};
LogService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], LogService);
export { LogService };
//# sourceMappingURL=log.service.js.map