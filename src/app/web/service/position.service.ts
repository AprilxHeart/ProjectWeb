import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient,
    private util: Utility
    ) {
  }

  readonly pathURL: string = "position";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  createPosition(body: any) {

    console.log('--createPosition Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-position`);
    return this.http.post(`${this.baseUrlReq}/create-position`, body,this.util.createAuthorizationHeader());

  }

  findPosition(body: any) {
    
    console.log('--findPosition Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-position`);
    return this.http.post(`${this.baseUrlReq}/find-position`, body,this.util.createAuthorizationHeader());

  }

  updatePosition(body: any) {

    console.log('--updatePosition Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-position`);
    return this.http.post(`${this.baseUrlReq}/update-position`, body,this.util.createAuthorizationHeader());

  }


  dropdownPositionParent(body: any) {

    console.log('--  dropdownPositionParent Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/dropdown-parent`);
    return this.http.post(`${this.baseUrlReq}/dropdown-parent`, body,this.util.createAuthorizationHeader());

  }

  checkPositionParent(body: any) {

    console.log('--  checkPositionParent --');
    console.log(body);
    console.log(`${this.baseUrlReq}/check-parent`);
    return this.http.post(`${this.baseUrlReq}/check-parent`, body,this.util.createAuthorizationHeader());

  }

}
