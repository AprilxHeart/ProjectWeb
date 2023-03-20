import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private util: Utility) { }

  readonly pathURL: string = "authen";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;


  findUserprofile(body: any) {

    return this.http.post(`${this.baseUrlReq}/find-userprofile`,body,this.util.createAuthorizationHeader());

  }

  getAccessToken(body: any) {
    return this.http.post(`${this.baseUrlReq}/gettoken`, body);
  }

  isAuthenticated() {
    const token = <any> localStorage.getItem(SESSION.SESSION_ID); // get token from local storage
    console.log('check token');
    console.log(token);
    if (!this.util.isEmpty(token)) {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


}
