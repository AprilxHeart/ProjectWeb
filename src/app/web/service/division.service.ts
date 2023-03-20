import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility'

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private http: HttpClient,
    private util: Utility
    ) {

  }

  readonly pathURL: string = "division";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  findDivision(body: any)
  {
    console.log('--findDivision Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/find-division`, body,this.util.createAuthorizationHeader());
  }

  createDivision(body: any) {

    console.log('-- createDivision Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-division`);
    return this.http.post(`${this.baseUrlReq}/create-division`, body,this.util.createAuthorizationHeader());

  }

  updateDivision(body: any) {

    console.log('-- updateDivision Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-division`);
    return this.http.post(`${this.baseUrlReq}/update-division`, body,this.util.createAuthorizationHeader());

  }

  dropdownDivisionParent(body: any) {

    console.log('--  dropdownDivisionParent Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/dropdown-parent`);
    return this.http.post(`${this.baseUrlReq}/dropdown-parent`, body,this.util.createAuthorizationHeader());

  }

  checkDivisionParent(body: any) {

    console.log('--  checkDivisionParent --');
    console.log(body);
    console.log(`${this.baseUrlReq}/check-parent`);
    return this.http.post(`${this.baseUrlReq}/check-parent`, body,this.util.createAuthorizationHeader());

  }


  checkDivisionParentAndDiv(body: any) {

    console.log('--  checkDivisionParentAndDiv --');
    console.log(body);
    console.log(`${this.baseUrlReq}/check-parentdiv`);
    return this.http.post(`${this.baseUrlReq}/check-parentdiv`, body,this.util.createAuthorizationHeader());

  }

  checkDivisionName(body: any) {

    console.log('--  checkDivisionName --');
    console.log(body);
    console.log(`${this.baseUrlReq}/check-division-name`);
    return this.http.post(`${this.baseUrlReq}/check-division-name`, body,this.util.createAuthorizationHeader());

  }



}
