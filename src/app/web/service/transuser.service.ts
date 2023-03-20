import { Injectable } from '@angular/core';
import { Utility } from 'src/app/web/utill/utility';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransuserService {

  constructor(private http: HttpClient,
              private util: Utility) { }

    readonly pathURL: string = "trnuser";
    readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

    searchDivision(body: any) {
        console.log('--findDivisionCreateTranuser Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}/find-division-create-tranuser`);
        return this.http.post(`${this.baseUrlReq}/find-division-create-tranuser`, body,this.util.createAuthorizationHeader());
    }

    findTranUser(body: any) {
        console.log('--findTranUser Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}/find-transuser`);
        return this.http.post(`${this.baseUrlReq}/find-transuser`, body,this.util.createAuthorizationHeader());
    }

    findTranUserByUserId(body: any) {
        console.log('--findTranUserByUserId Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}//find-transuser-by-userid`);
        return this.http.post(`${this.baseUrlReq}/find-transuser-by-userid`, body,this.util.createAuthorizationHeader());
    }

    searchPositionByDevId(body: any) {
        console.log('--searchPositionByDevId Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}/find-position-by-devid`);
        return this.http.post(`${this.baseUrlReq}/find-position-by-devid`, body,this.util.createAuthorizationHeader());
    }

    create(body: any) {
        console.log('--create-transuser Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}/create-transuser`);
        return this.http.post(`${this.baseUrlReq}/create-transuser`, body,this.util.createAuthorizationHeader());
    }


    update(body: any) {
        console.log('--update-transuser Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}/update-transuser`);
        return this.http.post(`${this.baseUrlReq}/update-transuser`, body,this.util.createAuthorizationHeader());
    }


    checkDuplicateUsername(body: any) {
        console.log('--checkDuplicateUsername Service--');
        console.log(body);
        console.log(`${this.baseUrlReq}/check-duplicate-username`);
        return this.http.post(`${this.baseUrlReq}/check-duplicate-username`, body,this.util.createAuthorizationHeader());
    }




}
