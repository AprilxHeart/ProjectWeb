import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/web/api/product';
import { ProductService } from 'src/app/web/service/product.service';
import { UserProfileService } from 'src/app/web/service/userprofile.service';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import jwt_decode from 'jwt-decode';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { UserProfile } from 'src/app/web/api/userProfile';
import { DatePipe } from "@angular/common";
import { DropdownOrganization } from 'src/app/web/api/dropdownOrganization';
import { Utility } from 'src/app/web/utill/utility';
import { SESSION } from 'src/app/web/utill/constants';
import * as e from 'cors';

@Component({
    selector: 'app-list-user-profile',
    templateUrl: './list-user-profile.component.html',
    styleUrls: ['./list-user-profile.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe],
})
export class ListUserProfileComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private userProfileService: UserProfileService,
        private mstlovService: MstlovService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public datepipe: DatePipe,
        private util: Utility
    ) {}

    displayResponsiveCreateProfile: boolean = false;
    displayResponsiveEditProfile: boolean = false;
    loading = [false, false];
    btnEditIsdisable: boolean = false;
    items!: MenuItem[];

    userName!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    moblie!: string;
    startdate!: string;
    enddate!: string;

    profileStatusRadio: string = '';

    dropdownTypeItems: DropdownOrganization[] = [];
    selectedCreateProfileTypeMstLov!: DropdownOrganization;
    dropdownTypeMstLov: DropdownOrganization[] = [];
    selectedEditProfileTypeMstLovId: string = '';
    selectedEditProfileTypeMstLovName: string = '';

    submitted: boolean = false;
    statuses: any[] = [];
    products!: Product[];
    userProfiles!: UserProfile[];
    selectedUserProfiles: UserProfile[] = [];
    userProfile: UserProfile = {} as UserProfile;
    product!: Product;
    selectedProducts: Product[] = [];
    userProfileDialog: boolean = false;

    ngOnInit(): void {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.dropdownTypeItems = [{ name: 'Please Select', id: '' }];
        this.getOrganizationMstLov();
        this.findProfile();
        this.profileStatusRadio = 'ACTIVE';
        this.userName = '';
        this.selectedCreateProfileTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.btnEditIsdisable = false;
    }

    isFormInvalid: boolean = false;
    userNameInvalid: boolean = false;
    userprofiletypeInvalid: boolean = false;
    effectiveStartDateStr = this.userProfile.startdate;
    effectiveEndDateStr = this.userProfile.enddate;

    setEventCalendar(event: any, mc: any, dateType: string) {

        let dateTime = new Date(event);
        let dateTimeStr = <any>this.datepipe.transform(dateTime, 'yyyy-MM-dd HH:mm');

        if (dateType == 'start') {
        
            if (!this.util.isEmpty(this.userProfile.enddate)) {
                let calDate = this.util.calculateDiffDate(dateTimeStr, this.userProfile.enddate);
                if (calDate < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'end date must more then start date' });
                }else{

                    this.effectiveStartDateStr = dateTimeStr;
                    
                }
            }
        } else {

            let calDate = this.util.calculateDiffDate(this.userProfile.startdate, dateTimeStr);
            if (calDate < 0) {
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'end date must more then start date' });
            }else{

                this.effectiveEndDateStr = dateTimeStr;
            }
           

        }
    }

    getOrganizationMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'PERIOD' })
            .toPromise()
            .then((res: any) => {
                console.log(res.resultData);
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItems.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                });
            })
            .catch((err) => {});
    }

    /* checkActiveDivition(orgId: number, status: string) {

    if (status == "INACTIVE") {

      this.userProfileService.checkActiveDivision({ orgid: orgId }).toPromise().then((res: any) => {
        console.log(res.resultData);
        if (res.status == 'error') {

          let resultMessage = res.resultMessage ? res.resultMessage : '';
          this.messageService.add({ severity: 'warn', summary: 'Warning Division', detail: resultMessage });
          this.btnEditIsdisable = true;
        }

      }).catch((err) => {

      });

    } else {

      this.btnEditIsdisable = false;

    }


  } */

    showResponsiveDialogCreateProfile() {
        this.displayResponsiveCreateProfile = true;
        this.userName = '';
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.moblie = '';
        this.startdate = '';
        this.enddate = '';
        this.selectedCreateProfileTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.profileStatusRadio = 'ACTIVE';
        this.isFormInvalid = false;
        this.userNameInvalid = false;
        this.userprofiletypeInvalid = false;
    }

    testperiod() {
        console.log('testna2  ' + this.userProfile.period);
    }

    showResponsiveDialogEditProfile(userProfile: UserProfile) {
        this.userProfile = { ...userProfile };
        this.selectedEditProfileTypeMstLovId = this.userProfile.period;
        this.selectedEditProfileTypeMstLovName = this.userProfile.period;
        this.profileStatusRadio = this.userProfile.user_status;
        this.displayResponsiveEditProfile = true;
        this.btnEditIsdisable = false;
        this.isFormInvalid = false;
        this.userNameInvalid = false;
        this.userprofiletypeInvalid = false;

        console.log('testna' + this.userProfile.period);
    }

    hideDialog() {
        this.userProfileDialog = false;
        this.submitted = false;
    }




    findProfile() {
        let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
        token = JSON.parse(token);
        let tokendecode = jwt_decode<any>(token);
        console.log(token);

        let body = {
            principalNAME: tokendecode.userName,
            token: token,
        };

        this.userProfileService
            .findProfile(body)
            .toPromise()
            .then((res: any) => {
                console.log('--findProfile--');

                console.log(JSON.stringify(res.resultData));
                this.userProfiles = res.resultData.map(
                    (e: { startdate: string; enddate: string }) => {
                        e.startdate = this.formatDate(e.startdate)!;
                        e.enddate = this.formatDate(e.enddate)!;
                        return e;
                    }
                );
                console.log(res);
            })
            .catch((err) => {});
    }

    formatDate(myDate: any, format: string = 'mm/dd/yyyy') {
        var dateString = myDate;
        var date = new Date(dateString);
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

            return year + '-' + month + '-' + day;
        
    }

    editProfile(index: number) {
        if (!this.btnEditIsdisable) {
            if (this.userProfile.user_name == '') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'require userName',
                });
                return;
            }

            let checkdate = Date.parse(this.userProfile.enddate) - Date.parse(this.userProfile.startdate);


            if (checkdate < 0 && this.userProfile.enddate) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'End date should be greater than Start date',
                });
                this.userProfile.enddate = '' 
                console.log("enddate:"+this.userProfile.enddate);
                console.log("checkdate:"+checkdate);
                return;
            }

            if (this.userProfile.first_name == '') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'require firstname',
                });
                return;
            }
            if (this.userProfile.last_name == '') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'require lastname',
                });
                return;
            }
            if (this.userProfile.startdate == '') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'require startdate',
                });
                return;
            }

            if (this.selectedEditProfileTypeMstLovName == 'Please Select') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'require period',
                });
                return;
            }

            this.loading[index] = true;

            this.confirmationService.confirm({
                //target: event.target as EventTarget,
                message: 'Are you sure that you want to perform this action?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    let token = JSON.stringify(
                        localStorage.getItem(SESSION.SESSION_ID)
                    );
                    token = JSON.parse(token);
                    let tokendecode = jwt_decode<any>(token);
                    console.log('tokendecode--update');
                    console.log(tokendecode);

                    let body = {
                        user_profile_id: this.userProfile.user_profile_id,
                        user_name: this.userProfile.user_name.trim(),
                        first_name: this.userProfile.first_name,
                        last_name: this.userProfile.last_name,
                        email: this.userProfile.email,
                        mobile: this.userProfile.mobile,
                        startdate: this.formatDate(
                            this.userProfile.startdate,
                            'yyyy-mm-dd'
                        ),
                        enddate: this.formatDate(
                            this.userProfile.enddate,
                            'yyyy-mm-dd'
                        ),
                        user_status: this.profileStatusRadio,
                        period: this.selectedEditProfileTypeMstLovName,
                        principalNAME: tokendecode.sub,
                        token: token,
                    };

                    this.userProfileService
                        .updateProfile(body)
                        .toPromise()
                        .then((res: any) => {
                            if (res.status == 'success') {
                                this.findProfile();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Confirmed',
                                    detail: 'Success',
                                });
                                this.loading[index] = false;
                                this.displayResponsiveEditProfile = false;
                            } else {
                                let resultMessage = res.resultMessage
                                    ? res.resultMessage
                                    : 'Process Failed';
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Failed',
                                    detail: resultMessage,
                                });
                                this.loading[index] = false;
                            }
                        })
                        .catch((err) => {
                            console.log('error : ' + err);
                            this.loading[index] = false;
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Failed',
                                detail: 'Process Failed',
                            });
                        });
                },
                reject: () => {
                    this.loading[index] = false;
                },
            });
        }
    }

    createProfile(index: number) {
        let userprofiletype = this.selectedCreateProfileTypeMstLov;

        let checkdate = Date.parse(this.enddate) - Date.parse(this.startdate);


        if (checkdate < 0 && this.enddate) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'End date should be greater than Start date',
            });
            this.enddate = '' 
            console.log("enddate:"+this.enddate);
            console.log("checkdate:"+checkdate);
            return;
        }

        if (this.userName == '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require userName',
            });
            return;
        }
        if (this.firstname == '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require firstname',
            });
            return;
        }
        if (this.lastname == '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require lastname',
            });
            return;
        }
        if (this.userName == '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require name',
            });
            return;
        }
        if (this.startdate == '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require startdate',
            });
            return;
        }


        if (this.selectedCreateProfileTypeMstLov.name == 'Please Select') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require period',
            });
            return;
        }

        var regex = /^[0-9]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.moblie != ''){
        if (!regex.test(this.moblie)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Wrong moblie phone',
            });
            return;
        }}
        if(this.email != ''){
        if (!mailformat.test(this.email)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Wrong Email Input',
            });
            return;
        }}

        this.confirmationService.confirm({
            //target: event.target as EventTarget,
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.submitted = true;
                this.loading[index] = true;
                let token = JSON.stringify(
                    localStorage.getItem(SESSION.SESSION_ID)
                );
                token = JSON.parse(token);
                let tokendecode = jwt_decode<any>(token);

                console.log(token);

                let body = {
                    user_name: this.userName.trim(),
                    first_name: this.firstname,
                    last_name: this.lastname,
                    email: this.email,
                    mobile: this.moblie,
                    startdate: this.startdate,
                    enddate: this.enddate,
                    user_status: this.profileStatusRadio,
                    period: userprofiletype.name,

                    principalNAME: tokendecode.sub,
                    token: token,
                };

                this.userProfileService
                    .createProfile(body)
                    .toPromise()
                    .then((res: any) => {
                        console.log(res);

                        if (res.status == 'success') {
                            this.findProfile();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'Success',
                            });
                            this.loading[index] = false;
                            this.displayResponsiveCreateProfile = false;
                        } else {
                            let resultMessage = res.resultMessage
                                ? res.resultMessage
                                : 'Process Failed';
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Failed',
                                detail: resultMessage,
                            });
                            this.loading[index] = false;
                        }
                    })
                    .catch((err) => {
                        console.log('error : ' + err);
                        this.loading[index] = false;
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Failed',
                            detail: 'Process Failed',
                        });
                    });
            },
            reject: () => {
                this.loading[index] = false;
            },
        });
    }
}
