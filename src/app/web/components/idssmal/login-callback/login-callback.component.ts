import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoResponse } from 'src/app/web/api/Idssaml';
import { IdssamlService } from 'src/app/web/service/idssaml.service';
import { SESSION } from 'src/app/web/utill/constants';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {


  userInfoResponse: UserInfoResponse = {} as UserInfoResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private idssamlService: IdssamlService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      let sp = params['sp'];
      if (sp) {
        this.router.navigateByUrl('/');
      }
      if (code) {
        this.getUserInfo(code);
      }
    });
  }

  getUserInfo(code: string) {

    this.idssamlService.getUserinfo(code).toPromise().then((res: any) => {

      console.log('-----getUserInfo----');
      console.log(res);
      this.userInfoResponse = res;
      console.log(JSON.stringify(res));
      console.log(this.userInfoResponse);

     if(this.userInfoResponse.status == 'seccess'){

         console.log('seccess')

         if(this.userInfoResponse.system.statusCode == '0000'){

             console.log('0000')

              const user = {
                "userName": this.userInfoResponse.userinfo.username,
                "firstName": this.userInfoResponse.userinfo.firstname,
                "lastName": this.userInfoResponse.userinfo.lastname
            }

            localStorage.setItem(SESSION.SESSION_ID, this.userInfoResponse.system.resultData.token);
            localStorage.setItem(SESSION.SESSION_USER, JSON.stringify(user));
            localStorage.setItem(SESSION.SESSION_IDSSAML_REQ, JSON.stringify(this.userInfoResponse.idssaml));
            localStorage.setItem(SESSION.SESSION_IDSSAML_USER_INFO, JSON.stringify(this.userInfoResponse.userinfo));
            localStorage.setItem(SESSION.SESSION_SYSTEM, JSON.stringify(this.userInfoResponse.system));

            this.router.navigate(['/']);

         }else if(this.userInfoResponse.system.statusCode == '4005'){

          this.router.navigate(['/usernotfound']);

       }
     }
     
    }).catch((err) => {
      console.log(err);

    });

  }

  getUserInfo2(accessToken: string) {

    this.idssamlService.getUserinfo(accessToken).toPromise().then((res: any) => {
      
      console.log(res);
      if(res.sub){
        this.userInfoResponse = res;
        //localStorage.setItem('samltoken', JSON.stringify(this.accessTokenResponse));  
      }
     
    }).catch((err) => {
      console.log(err);
    });

  }

}
