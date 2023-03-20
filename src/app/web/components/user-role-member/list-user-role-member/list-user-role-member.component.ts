import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/web/api/product';
import { ProductService } from 'src/app/web/service/product.service';
import { UserRoleService } from 'src/app/web/service/user-role.service';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import jwt_decode from 'jwt-decode';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { UserRole } from 'src/app/web/api/userRole';
import { DropdownOrganization } from 'src/app/web/api/dropdownOrganization';
import { Utility } from 'src/app/web/utill/utility';
import { SESSION } from 'src/app/web/utill/constants';
import * as e from 'cors';
import { Dropdown } from 'src/app/web/api/Dropdown';

@Component({
    selector: 'app-list-user-role-member',
    templateUrl: './list-user-role-member.component.html',
    styleUrls: ['./list-user-role-member.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ListUserRoleComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private userRoleService: UserRoleService,
        private mstlovService: MstlovService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private util: Utility
    ) {}

    displayResponsiveCreateProfile: boolean = false;
    displayResponsiveEditProfile: boolean = false;
    loading = [false, false];
    btnEditIsdisable: boolean = false;
    items!: MenuItem[];
    mylistdata: any = [];
    userName!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    moblie!: string;
    startdate!: string;
    enddate!: string;
    Myindex !:number;
    profileStatusRadio: string = '';
    selectedCreateUser!: Dropdown;
    selectedCreateRole!: Dropdown;
    selectedEditRole2!: Dropdown;
    selectedEditUser: number = 0;
    selectedEditRoleName: string = '';
    selectedEditRole: number = 0;
    dropdownTypeItemsUser: Dropdown[] = [];
    dropdownTypeItemsRole: Dropdown[] = [];
    dropdownTypeItemsRole2: Dropdown[] = [];
    selectedCreateProfileTypeMstLov!: DropdownOrganization;
    dropdownTypeMstLov: DropdownOrganization[] = [];

    selectedEditProfileTypeMstLovId: string = '';
    selectedEditProfileTypeMstLovName: string = '';

    submitted: boolean = false;
    statuses: any[] = [];
    products!: Product[];
    userRoles!: UserRole[];
    selectedUserRoles: UserRole[] = [];
    userRole: UserRole = {} as UserRole;
    product!: Product;
    selectedProducts: Product[] = [];
    userRoleDialog: boolean = false;

    ngOnInit(): void {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.dropdownTypeItemsUser = [{ name: 'Please Select', id: 0 }];
        this.dropdownTypeItemsRole = [{ name: 'Please Select', id: 0 }];
        this.dropdownTypeItemsRole2 = [{ name: 'Please Select', id: 0 }];
        this.selectedCreateUser = { name: 'Please Select', id: 0 };
        this.selectedCreateRole = { name: 'Please Select', id: 0 };
        this.findProfile();
        this.profileStatusRadio = 'ACTIVE';
        this.userName = '';
        this.Myindex = 0
        this.selectedCreateProfileTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.btnEditIsdisable = false;
    }

    isFormInvalid: boolean = false;
    userNameInvalid: boolean = false;
    userRoletypeInvalid: boolean = false;


    /* checkActiveDivition(orgId: number, status: string) {

    if (status == "INACTIVE") {

      this.userRoleService.checkActiveDivision({ orgid: orgId }).toPromise().then((res: any) => {
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
        this.userRoletypeInvalid = false;
    }

    check2(){
        console.log(this.selectedEditUser)
    }

    check(){
        let myrolename:any = this.dropdownTypeItemsRole.find(x => x.id === this.selectedEditRole)
        this.selectedEditRoleName = myrolename.name
        console.log(this.selectedEditRoleName)
        console.log(this.selectedEditRole)
    }

    showResponsiveDialogEditProfile(userRole: UserRole) {
        this.userRole = { ...userRole };
        this.selectedEditRole = this.userRole.role_id;
        let myrolename:any = this.dropdownTypeItemsRole.find(x => x.id === this.selectedEditRole)
        this.selectedEditRoleName = myrolename.name
        this.selectedEditUser = this.userRole.user_profile_id;
        this.displayResponsiveEditProfile = true;
        this.btnEditIsdisable = false;
        this.isFormInvalid = false;
        this.userNameInvalid = false;
        this.userRoletypeInvalid = false;


    }

    hideDialog() {
        this.userRoleDialog = false;
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

        this.userRoleService
            .findProfile(body)
            .toPromise()
            .then((res: any) => {
                console.log('--findProfile--');

                console.log(JSON.stringify(res.resultData.resultData1));
                this.userRoles = res.resultData.resultData1
                console.log(res);
                
                if(this.Myindex == 0){
                res.resultData.resultData2.forEach((value: any, key: string) => {

                    this.dropdownTypeItemsUser.push({
                        name: value.user_name,
                        id: value.user_profile_id,
                    });
                
                });
                
                res.resultData.resultData3.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsRole.push({
                        name: value.role_name,
                        id: value.role_id,
                    });
                });
                this.Myindex = 1 }
                res.resultData.resultData3.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsRole2.push({
                        name: value.role_id + 'test'+value.role_name,
                        id: value.role_id,
                    });
                });
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

        if (format === 'yyyy-mm-dd') {
            return year + '-' + month + '-' + day;
        }
        return month + '/' + day + '/' + year;
    }

    editProfile(index: number) {
        if (!this.btnEditIsdisable) {
            

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
                        user_profile_id :this.selectedEditUser,
                        role_name : this.selectedEditRoleName,
                        role_id : this.selectedEditRole,
                        role_status : this.userRole.role_status,
                        role_member_id:this.userRole.role_member_id,
                        principalNAME: tokendecode.sub,
                        token: token,
                    };

                    this.userRoleService
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
    deletelist(idx:any){
        let index = this.mylistdata.findIndex((e: { idx: any; }) => e.idx == idx)
        this.mylistdata.splice(index, 1)
        console.log(index);
    }

    creatList(){
        let token = JSON.stringify(localStorage.getItem('sessionid'));
        token = JSON.parse(token);
        let tokendecode = jwt_decode<any>(token);
        let dupdata = this.mylistdata.findIndex((x: any) => x.role_id == this.selectedCreateRole.id && x.user_profile_id == this.selectedCreateUser.id);
        if (dupdata > -1){
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'ข้อมูลซ้ำ',
            });
            return;
        }


        if (this.selectedCreateRole.id == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require Role',
            });
            return;
        }
        if (this.selectedCreateUser.id == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require Username',
            });
            return;
        }


        let data = {
            user_name : this.selectedCreateUser.name,
            user_profile_id :this.selectedCreateUser.id,
            role_name : this.selectedCreateRole.name,
            role_id : this.selectedCreateRole.id,
            role_status : this.profileStatusRadio,
            principalNAME: tokendecode.sub,
            token: token,
        };
        this.mylistdata.push(data);
        this.mylistdata = this.mylistdata.map((x:any,index:any) => {
            x.idx = index
            return x
        })
        this.selectedCreateUser = { name: 'Please Select', id: 0 };
        this.selectedCreateRole = { name: 'Please Select', id: 0 };
        this.profileStatusRadio = 'ACTIVE';
        console.log(this.mylistdata);
    }
    createProfile(index: number) {
        let userprofiletype = this.selectedCreateProfileTypeMstLov;
        if (this.mylistdata.length == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require Data',
            });
            return;
        }

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
                    user_name : this.selectedEditUser,
                    user_profile_id :this.selectedEditUser,
                    role_name : this.selectedEditRole,
                    role_id : this.selectedEditRole,
                    role_status : this.userRole.role_status,
                    principalNAME: tokendecode.sub,
                    token: token,
                };



                for (let i = 0; i < this.mylistdata.length; i++){
                this.userRoleService.createProfile(this.mylistdata[i]).toPromise().then((res: any) => {
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
                }
                this.mylistdata.splice(0)},
            reject: () => {
                this.loading[index] = false;
            },
        });
    }
}
