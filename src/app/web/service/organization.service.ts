import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http: HttpClient,
    private util: Utility
    ) {
  }

  readonly pathURL: string = "org";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  createOrganization(body: any) {

    console.log('--createOrganization Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-organization`);
    return this.http.post(`${this.baseUrlReq}/create-organization`, body,this.util.createAuthorizationHeader());
  
  }

  findOrganization(body: any) {

    console.log('--findOrganization Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-organization`);
    return this.http.post(`${this.baseUrlReq}/find-organization`, body,this.util.createAuthorizationHeader());

  }

  updateOrganization(body: any) {

    console.log('--updateOrganization Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-organization`);
    return this.http.post(`${this.baseUrlReq}/update-organization`, body,this.util.createAuthorizationHeader());

  }


  checkActiveDivision(body: any) {

    console.log('--checkActiveDivision Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-active-divition`);
    return this.http.post(`${this.baseUrlReq}/find-active-divition`, body,this.util.createAuthorizationHeader());

  }

  getDropdownListOranization(body: any) {

    console.log(`${this.baseUrlReq}/get-organization-list`);
    return this.http.post(`${this.baseUrlReq}/get-organization-list`, body,this.util.createAuthorizationHeader());

  }

}
