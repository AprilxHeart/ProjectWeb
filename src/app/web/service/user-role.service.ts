import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';


@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(
    private http: HttpClient,
    private util: Utility
    ) {
  }

  

  readonly pathURL: string = "userrolemember";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  createProfile(body: any) {

    console.log('--createuserrolemember Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-userrolemember`);
    return this.http.post(`${this.baseUrlReq}/create-userrolemember`, body,this.util.createAuthorizationHeader());

  }

  findProfile(body: any) {
    
    console.log('--finduserrolemember Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-userrolemember`);
    return this.http.post(`${this.baseUrlReq}/find-userrolemember`, body,this.util.createAuthorizationHeader());

  }

  updateProfile(body: any) {

    console.log('--updateuserrolemember Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-userrolemember`);
    return this.http.post(`${this.baseUrlReq}/update-userrolemember`, body,this.util.createAuthorizationHeader());

  }



}
