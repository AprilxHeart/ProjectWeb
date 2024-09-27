import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/web/service/auth.service';
import { SESSION } from 'src/app/web/utill/constants';
import jwt_decode from 'jwt-decode';
import { Utility } from 'src/app/web/utill/utility';
import {environment} from "src/environments/environment";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {


    valCheck: string[] = ['remember'];
    password: string = SESSION.PASSWORD;
    username!: string;
    isLoginIdsSaml:boolean = environment.IS_LOGIN_IDS_SAML;

    constructor(
        public layoutService: LayoutService,
        private ahthService: AuthService,
        private router: Router,
        private util: Utility,
    ) { }

    ngOnInit(): void {

        if(environment.IS_LOGIN_IDS_SAML){

            //window.location.href=`${environment.IDS_SAML_ENPOINT_URL}${environment.IDS_SAML_URL_PATH}${environment.IDS_SAML_SERVICE}?response_type=code&client_id=${environment.IDS_SAML_CLIENT_ID}&redirect_uri=${environment.IDS_SAML_LOGIN_CALLBACK}&scope=openid`;
        
        }

    }


    onLogin() {

        if(environment.IS_LOGIN_IDS_SAML){

            //console.log(`${environment.IDS_SAML_ENPOINT_URL}${environment.IDS_SAML_URL_PATH}${environment.IDS_SAML_SERVICE}?response_type=code&client_id=${environment.IDS_SAML_CLIENT_ID}&redirect_uri=${environment.IDS_SAML_LOGIN_CALLBACK}&scope=openid`)

            window.location.href=`${environment.IDS_SAML_ENPOINT_URL}${environment.IDS_SAML_URL_PATH}${environment.IDS_SAML_SERVICE}?response_type=code&client_id=${environment.IDS_SAML_CLIENT_ID}&redirect_uri=${environment.IDS_SAML_LOGIN_CALLBACK}&scope=openid`;
            //window.location.href='https://test-ids.ais.co.th/oidc/logout?id_token_hint='+id_token_hint+'&post_logout_redirect_uri=https://dev-sdm.intra.ais/SDMWeb/OAUTHLogin';
        }else{

            this.ahthService.getAccessToken({ username: this.username, password: this.password }).toPromise().then((res: any) => {
            
                if (res) {
                    const {token} = res.resultData
                    let tokendecode = jwt_decode<any>(token);
                    localStorage.setItem(SESSION.SESSION_ID, token);
                    this.ahthService.findUserprofile({ username: tokendecode.sub }).toPromise().then((res: any) => {
                        console.log('----res findUserprofile-------');
                        console.log(res);
                        const { resultData } = res;
                        console.log('ASD',JSON.stringify(resultData));
                        const user = {
                            "userName": resultData.userName,
                            "firstName": resultData.firstName,
                            "lastName": resultData.lastName,
                            "email" : resultData.email,
                            "mobile" : resultData.mobile,
                        }
                        const userProfileId = {
                            "userProfileId": resultData.userProfileId,
                        }
                        localStorage.setItem(SESSION.SESSION_USER, JSON.stringify(user));
                        this.router.navigate(['/']);
                        console.log(user);
    
                    }).catch(() => {
                        console.log('error getuser');
                    }); 
                }
            }).catch((error) => {
                console.log('error get token');
                console.log(error);
            });

        }

    }



}
