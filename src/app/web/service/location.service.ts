import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SESSION } from 'src/app/web/utill/constants';
import { Utility } from 'src/app/web/utill/utility';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient
    ,private util: Utility) { }

  readonly pathURL: string = "location";
  readonly baseUrlReq: string = `${environment.AUTH_SERVER}${environment.apiBaseURL}/${this.pathURL}`;

  dropdownLocation(body: any)
  {
    console.log('--dropdownLocation Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/dropdown-location`, body,this.util.createAuthorizationHeader());
  }

  dropdownProvince(body: any)
  {
    console.log('--dropdownProvince Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/dropdown-province`, body,this.util.createAuthorizationHeader());
  }
  dropdownAmphur(body: any)
  {
    console.log('--dropdownAmphur Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/dropdown-amphur`, body,this.util.createAuthorizationHeader());
  }
  dropdownTumbol(body: any)
  {
    console.log('--dropdownTumbol Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/dropdown-tumbol`, body,this.util.createAuthorizationHeader());
  }
  dropdownZipcode(body: any)
  {
    console.log('--dropdownZipcode Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/dropdown-zipcode`, body,this.util.createAuthorizationHeader());
  }

  findLocation(body: any)
  {
    console.log('--findLocation Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/find-location`, body,this.util.createAuthorizationHeader());
  }

  ddlSubRegion(body: any)
  {
    console.log('--DDL SubReion Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/dropdown-subregion`, body,this.util.createAuthorizationHeader());
  }

  createLocation(body: any) {

    console.log('-- createLocation Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/create-location`);
    return this.http.post(`${this.baseUrlReq}/create-location`, body,this.util.createAuthorizationHeader());

  }

 updateLocation(body: any) {

    console.log('-- updateLocation Service--');
    console.log(body);
    console.log(`${this.baseUrlReq}/update-location`);
    return this.http.post(`${this.baseUrlReq}/update-location`, body,this.util.createAuthorizationHeader());

  }

  LocationById(body: any)
  {
    console.log('--LocationById Service--');
    console.log(body);
    return this.http.post(`${this.baseUrlReq}/location-byid`, body,this.util.createAuthorizationHeader());
  }
}
