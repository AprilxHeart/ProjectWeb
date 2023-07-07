import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import jwt_decode from 'jwt-decode';
import { Utility } from 'src/app/web/utill/utility';
import { SESSION } from 'src/app/web/utill/constants';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService]
})
export class AppTopBarComponent  {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private util: Utility,
        private router: Router,
        private confirmationService: ConfirmationService,
        ) { }

    userFullName:string = '';

    ngOnInit() {

        let token = localStorage.getItem(SESSION.SESSION_USER);
        token = JSON.parse(<any>token);
        let tokendecode  = <any>token;
        console.log('tokendecode '); 
        console.log(token); 

        if(!this.util.isEmpty(token)){
            this.userFullName = tokendecode.firstName + ' ' + tokendecode.lastName;
        }
        
        this.items = [
            {label: 'Profile', icon: 'pi pi-user', command: () => {
                //this.update();
            }},
            {separator:true},
            {label: 'Logout', icon: 'pi pi-sign-out',  command: () => {
                this.logout();
            }}
        ];

    }

    logout(){

        this.confirmationService.confirm({
            message: 'Are you sure logout action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const id_token_hint = localStorage.getItem('samlcode');
                //window.location.href='https://test-ids.ais.co.th/oidc/logout?id_token_hint='+id_token_hint+'&post_logout_redirect_uri=' + environment.LOGIN_PAGE;
                window.location.href='https://localhost:4200/auth/login';
                localStorage.removeItem(SESSION.SESSION_ID);
                localStorage.removeItem('samlcode');
                //this.router.navigate(['/auth/login']);
            }
        });     
    }


}
