import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private util: Utility
    ) {
  }

  

  readonly pathURL: string = "project";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  createproject(body: any) {

    console.log('--createproject Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-project`);
    return this.http.post(`${this.baseUrlReq}/create-project`, body,this.util.createAuthorizationHeader());

  }

  findproject(body: any) {
    
    console.log('--findproject Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-project`);
    return this.http.post(`${this.baseUrlReq}/find-project`, body,this.util.createAuthorizationHeader());

  }
  findprojectbyid(body: any) {
    
    console.log('--findprojectbyid Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-projectbyid`);
    return this.http.post(`${this.baseUrlReq}/find-projectbyid`, body,this.util.createAuthorizationHeader());

  }
  findmyproject(body: any) {
    
    console.log('--findmyproject Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-myproject`);
    return this.http.post(`${this.baseUrlReq}/find-myproject`, body,this.util.createAuthorizationHeader());

  }
  findapproveproject(body: any) {
    
    console.log('--findapproveproject Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-approveproject`);
    return this.http.post(`${this.baseUrlReq}/find-approveproject`, body,this.util.createAuthorizationHeader());

  }
  approveproject(body: any) {

    console.log('--approveproject Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/approve-project`);
    return this.http.post(`${this.baseUrlReq}/approve-project`, body,this.util.createAuthorizationHeader());

  }

  updateproject(body: any) {

    console.log('--updateproject Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-project`);
    return this.http.post(`${this.baseUrlReq}/update-project`, body,this.util.createAuthorizationHeader());

  }



}
