import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utility } from '../utill/utility';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient,private util: Utility) { }
  readonly pathURL: string = "menu";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  findLeftMenu(body: any) {
    
    console.log('--findMstLovByTypeName Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-left-menu`);
    return this.http.post<any>(`${this.baseUrlReq}/find-left-menu`, body,this.util.createAuthorizationHeader());

  }
}
