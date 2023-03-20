import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utility } from '../utill/utility';

@Injectable({
  providedIn: 'root'
})
export class IdssamlService {

  constructor(private http: HttpClient,private util: Utility) { }

  readonly tokenEnpoint = `${environment.IDS_SAML_BASE_URL}/${environment.IDS_SAML_URL_PATH}${environment.IDS_SAML_TOKEN_SERVICE}`;
  readonly userInfoEnpoint = `${environment.IDS_SAML_BASE_URL}/${environment.IDS_SAML_URL_PATH}${environment.IDS_SAML_USERINFO_SERVICE}`;

  getUserinfo(code:string) {

      //let body = new URLSearchParams();

      //body.set("code",code);
      let body = {
        code : code
      }

      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = { headers: headers };

      return this.http.post<any>(`http://localhost:3200/getuserprofile`, body,options);
  
    }

    getUserinfo2(accessToken:string) {

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + accessToken
      });
      let options = { headers: headers };

      return this.http.get<any>(`${this.userInfoEnpoint}`,options);
  
    }

}
