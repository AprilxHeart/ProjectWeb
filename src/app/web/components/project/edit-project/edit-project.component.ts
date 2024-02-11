import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { CountryService } from 'src/app/web/service/country.service';
import { ProjectService } from "../../../service/project.service";
import { Utility } from "../../../utill/utility";
import { TranUserSeachDivition } from "../../../api/tranUserSeachDivition";
import { TranUser } from "../../../api/tranUser";
import { MstlovService } from "../../../service/mstlov.service";
import { DatePipe } from "@angular/common";
import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION,KEYFILLTER } from "../../../utill/constants";
import { Dropdown } from 'src/app/web/api/Dropdown';
import { UserRoleService } from 'src/app/web/service/user-role.service';
import { Project } from 'src/app/web/api/Project';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe]
})
export class EditProjectComponent implements OnInit {
    Myindex = 0;
    //list Project

    
  //Dropdown
  dropdownTypeItemsYear: Dropdown[] = [];
  SelectItemsYear!: Dropdown;
  dropdownTypeItemsTEST02: Dropdown[] = [];
  SelectItemsTEST02!: Dropdown;
  dropdownTypeItemsTEST03: Dropdown[] = [];
  SelectItemsTEST03!: Dropdown;
  dropdownTypeItemsTEST04: Dropdown[] = [];
  SelectItemsTEST04!: Dropdown;
  dropdownTypeItemsTEST05: Dropdown[] = [];
  SelectItemsTEST05!: Dropdown;
  dropdownTypeItemsTEST06: Dropdown[] = [];
  SelectItemsTEST06!: Dropdown;
  dropdownTypeItemsUser: Dropdown[] = [];
  SelectItemsUser!: Dropdown;

  dropdownTypeItemsUserApprove: Dropdown[] = [];

    project: Project = {} as Project;

    paramSerachproject: Project = {} as Project;

    listproject: Project[] = [];

    //Project
    project_id:number  =0 ;
    agency: string ='';
    budget: string ='';
    fiscal_year: string ='';
    product: string ='';
    sub_product: string ='';
    project_name: string ='';
    project_character: string ='';
    development_plan: string ='';
    strategic: string ='';
    goal: string ='';
    strategy: string =''; 
    measure: string ='';
    plans: string ='';
    reason: string ='';
    objective: string ='';
    target_group_student:number  =0 ;
    target_group_personnel:number  =0 ;
    target_group_outsider:number  =0 ;
    user_id:number  =0 ;
    place:string ='';
    startdate:string ='';
    enddate:string ='';
    implementation:string ='';
    indicators:string ='';
    cost:number  =0 ;
    expect_result:string ='';
    project_evaluation: string ='';
    follow_up:string ='';
    project_proponent:number  =0 ;
    project_approver:number  =0 ;
    project_status:string ='';
    created_date:string ='';
    created_by:string ='';
    updated_date:string ='';
    updated_by:string ='';

    //@ViewChild("prefixElem") prefixElem: ElementRef = {} as ElementRef;
    keyFillter : any =  KEYFILLTER;
    //User Detail
    divisionName: string = '';
    divisionId: number = 0;
    selectedDivisionName: string = '';
    selectedDivisionId: number = 0;
    selectedLocationId: number = 0;


    positionId: number = 0;
    managerId: number = 0;
    prifix: string = '';
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    userStatus: string = '';

    //Other information
    userCode: string = '';
    email: string = '';
    mobile: string = '';
    phone: string = '';
    period: string = '';
    remark: string = '';
    effectiveStratDate: string = '';
    effectiveEndDate: string = '';

    //ASC information
    userType: string = '';
    userASCCode: string = '';
    ascCategory: string = '';
    ascPosition: string = '';
    userASCRole: string = '';

    //selected
    divisionSelected!: TranUserSeachDivition;

    //mess
    messageDataNotFound: string = '';

    //list division
    virtualListDivision!: TranUserSeachDivition;
    listDivision!: TranUserSeachDivition[];
    kwDivision: string = "";

    //loading button
    loading = [false, false]

    //dialog Search Division
    displayResponsiveSearchDivision: boolean = false;

    //dropdown Position
    dropdownPositionItems: ObjDropdownPositionItem[] = [];
    selectedPosition: number = 0;

    //dropdown Manager
    dropdownManagerItems: ObjDropdownManagerItem[] = [];
    selectedManager: string = '';

    //dropdown Status
    dropdownStatusItems: ObjDropdownItem[] = [];
    selectedStatus: string = '';

    //dropdown mst lov
    dropdownUserTypeMstLov: ObjDropdownItem[] = [];
    dropdownAscCategoryMstLov: ObjDropdownItem[] = [];
    dropdownUserAscRoleMstLov: ObjDropdownItem[] = [];
    dropdownAscPositionMstLov: ObjDropdownItem[] = [];
    dropdownPeriodMstLov: ObjDropdownItem[] = [];
    dropdownPrefixMstLov:ObjDropdownItem[] = [];

    selectedUserTypeMstLov: string = '';
    selectedAscCategoryMstLov: string = '';
    selectedUserAscRoleMstLov: string = '';
    selectedAscPositionMstLov: string = '';
    selectedPeriodMstLov: string = '';

    refId: number = 0;

    constructor(
        private countryService: CountryService,
        private filterService: FilterService,
        private projectService: ProjectService,
        private userRoleService: UserRoleService,
        private messageService: MessageService,
        private util: Utility,
        private confirmationService: ConfirmationService,
        private mstlovService: MstlovService,
        public datepipe: DatePipe,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }



    ngOnInit() {
        

        this.route.params.subscribe(params => {
            if (params['ref']) {
                (1)
                this.refId = parseInt(params['ref']);
            }
        });
        this.getUsernameProject();
        this.getMstLovagency();
        this.getMstLovYear();
        this.getMstLovTEST02();
        this.getMstLovTEST03();
        this.getMstLov4();
        this.getMstLov5();
        
        
        
        this.Myindex=2;
        if(this.Myindex=2){
        this.getfindprojectbyid();

    }


        
        console.log( this.project);
        //this.dropdownPositionItems.push({ name: 'Plase Select', id: 0 });
        //this.dropdownManagerItems.push({ name: 'Plase Select', id: 0 });

        this.dropdownStatusItems.push(
            { name: 'Active', id: 'ACTIVE',disabled: false },
            { name: 'InActive', id: 'INACTIVE',disabled: false }
        );

       
    }

    getfindprojectbyid() {

        this.projectService.findprojectbyid({ project_id: this.refId }).toPromise().then((res: any) => {
            console.log('getFindProjectById');
            console.log(res);
            console.log(res.resultData);
            this.project = res.resultData[0];

            this.agency = this.project.agency ;
            this.fiscal_year = this.project.fiscal_year ;
            this.budget = this.project.budget ;
            this.product = this.project.product ;
            this.project_character = this.project.project_character ;
            this.strategic = this.project.strategic ;
            this.project.startdate = this.formatDate(this.project.startdate);
            this.project.enddate = this.formatDate(this.project.enddate);
            console.log('testdate'+this.project.startdate);
            this.Myindex = 1;

        }).catch((err) => {
            console.log(err);
        });

    }



    getMstLovYear() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'YEAR' })
            .toPromise()
            .then((res: any) => {
                console.log("getMstLovYear");
                console.log(res.resultData);
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsYear.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                });
            })
            .catch((err) => {});
    }
    getMstLovTEST02() {
        this.mstlovService
        
            .findMstLovByTypeName({ typename: 'TEST02' })
            .toPromise()
            .then((res: any) => {
                console.log("TEST02");
                console.log(res.resultData);
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsTEST02.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                });
            })
            .catch((err) => {});
    }
    getMstLovTEST03() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'TEST03' })
            .toPromise()
            .then((res: any) => {
                console.log("TEST03");
                console.log(res.resultData);
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsTEST03.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                });
            })
            .catch((err) => {});
    }
    getMstLov4() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'TEST04' })
            .toPromise()
            .then((res: any) => {
                console.log("TEST04");
                console.log(res.resultData);

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsTEST04.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                    
                });
            })
            .catch((err) => {});
    }
    getMstLov5() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'TEST05' })
            .toPromise()
            .then((res: any) => {
                console.log("TEST05");
                console.log(res.resultData);

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsTEST05.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                    
                });
            })
            .catch((err) => {});
    }
    getMstLovagency() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'TEST06' })
            .toPromise()
            .then((res: any) => {
                console.log("TEST06");
                console.log(res.resultData);

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsTEST06.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                    
                } 
                
                );
            }
            
            )
            .catch((err) => {});

    }

    getUsernameProject() {
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
                console.log('--findUsernameProject--');
                if(this.Myindex == 0){
                res.resultData.resultData5.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsUser.push({
                        name: value.user_name,
                        id: value.user_profile_id,
                    });
                
                });
                res.resultData.resultData4.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsUserApprove.push({
                        name: value.user_name,
                        id: value.user_profile_id,
                    });
                
                });
                
                this.Myindex = 1 }
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







    /* setEventCalendar(event: any, mc: any, dateType: string) {

        let dateTime = new Date(event);
        let dateTimeStr = <any>this.datepipe.transform(dateTime, 'yyyy-MM-dd HH:mm');

        if (dateType == 'start') {
        
            if (!this.util.isEmpty(this.project.effectiveEndDate)) {
                let calDate = this.util.calculateDiffDate(dateTimeStr, this.tranUser.effectiveEndDate);
                if (calDate < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'end date must more then start date' });
                }else{

                    this.tranUser.effectiveStartDateStr = dateTimeStr;
                    
                }
            }
        } else {

            let calDate = this.util.calculateDiffDate(this.tranUser.effectiveStartDate, dateTimeStr);
            if (calDate < 0) {
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'end date must more then start date' });
            }else{

                this.tranUser.effectiveEndDateStr = dateTimeStr;
            }
           

        }
    } */

    UpdateProject(index: number) {

        let checkdate = Date.parse(this.enddate) - Date.parse(this.startdate);


        if (checkdate < 0 && this.enddate) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'End date should be greater than Start date',
            });
            this.enddate = '' 
            return;
        }

        if (this.project_name == '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require Project Name',
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




        var regex = /^[0-9]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        /* if(this.moblie != ''){
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
        }} */

        this.confirmationService.confirm({
            //target: event.target as EventTarget,
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loading[index] = true;
                let token = JSON.stringify(
                    localStorage.getItem(SESSION.SESSION_ID)
                );
                token = JSON.parse(token);
                let tokendecode = jwt_decode<any>(token);

                console.log(token);

                let body = {
                    project_id: this.project.project_id,
                    agency: this.project.agency,
                    fiscal_year: this.project.fiscal_year,
                    budget: this.project.budget,
                    product: this.project.product,
                    sub_product: this.project.sub_product,
                    project_name: this.project.project_name,
                    project_character: this.project.project_character,
                    development_plan: this.project.plans,
                    strategic: this.project.strategic,
                    goal: this.project.goal,
                    strategy: this.project.strategy,
                    measure: this.project.measure,
                    plans: this.project.plans,
                    reason: this.project.reason,
                    objective: this.project.objective,
                    target_group_student: this.project.target_group_student,
                    target_group_personnel: this.project.target_group_personnel,
                    target_group_outsider: this.project.target_group_outsider,
                    user_id: this.project.user_id,
                    place: this.project.place,
                    startdate: this.formatDate(
                        this.project.startdate,
                        'yyyy-mm-dd'
                    ),
                    enddate: this.formatDate(
                        this.project.enddate,
                        'yyyy-mm-dd'
                    ),
                    implementation: this.project.implementation,
                    indicators: this.project.indicators,
                    cost: this.project.cost,
                    expect_result: this.project.expect_result,
                    project_evaluation: this.project.project_evaluation,
                    follow_up: this.project.expect_result,
                    project_proponent: this.project.project_proponent,
                    project_approver: this.project.project_approver,
                    period: this.project.period,
                    principalNAME: tokendecode.sub,
                    token: token,
                };

                this.projectService
                    .updateproject(body)
                    .toPromise()
                    .then((res: any) => {
                        console.log(res);

                        if (res.status == 'success') {
                            //this.findproject();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'Success',
                            });
                            this.loading[index] = false;
                            setTimeout(()=>{                           //<<<---using ()=> syntax
                                this.router.navigate(['/project']);
                           }, 1500);
                            //this.displayResponsiveCreateProfile = false;
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





    linkBack() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigate(['/project']);
            }
        });
    }



    createDivision(index: number) {

        this.loading[index] = true;
    }


    searchOrganization(index: number) {

        this.loading[index] = true;


    }

}


interface ObjDropdownItem {
    name: string;
    id: string;
    disabled:boolean;
}

interface ObjDropdownPositionItem {
    name: string;
    id: number;
}

interface ObjDropdownManagerItem {
    name: string;
    id: number;
}
