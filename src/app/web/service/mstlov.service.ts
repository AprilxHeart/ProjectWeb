import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utility } from 'src/app/web/utill/utility';

@Injectable({
  providedIn: 'root'
})
export class MstlovService {

  constructor(private http: HttpClient,private util: Utility) { }

  readonly pathURL: string = "mstlov";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;


  findMstLovByTypeName(body: any) {

  /*   console.log('--findMstLovByTypeName Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/find-by-typename`); */
    return this.http.post<any>(`${this.baseUrlReq}/find-by-typename`, body,this.util.createAuthorizationHeader());

  }
  findMstLov(body: any) {

    /*   console.log('--findMstLovByTypeName Service--');
      console.log(body);
      console.log(`${this.baseUrlReq}/find-by-typename`); */
      return this.http.post<any>(`${this.baseUrlReq}/find-lov`, body,this.util.createAuthorizationHeader());

    }

    DDLtype(body: any) {


          return this.http.post<any>(`${this.baseUrlReq}/ddl-type`, body,this.util.createAuthorizationHeader());

        }

    creat(body: any) {


         return this.http.post<any>(`${this.baseUrlReq}/create-lov`, body,this.util.createAuthorizationHeader());

          }
    update(body: any) {


            return this.http.post<any>(`${this.baseUrlReq}/update-lov`, body,this.util.createAuthorizationHeader());

             }

}
