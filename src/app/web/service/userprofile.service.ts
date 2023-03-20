import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient,
    private util: Utility
    ) {
  }

  

  readonly pathURL: string = "user-profile";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  createProfile(body: any) {

    console.log('--createProfile Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-profile`);
    return this.http.post(`${this.baseUrlReq}/create-profile`, body,this.util.createAuthorizationHeader());

  }

  findProfile(body: any) {
    
    console.log('--findProfile Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-profile`);
    return this.http.post(`${this.baseUrlReq}/find-profile`, body,this.util.createAuthorizationHeader());

  }

  updateProfile(body: any) {

    console.log('--updateProfile Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-profile`);
    return this.http.post(`${this.baseUrlReq}/update-profile`, body,this.util.createAuthorizationHeader());

  }



}
