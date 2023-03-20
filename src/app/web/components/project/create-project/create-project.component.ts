import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from "../../../service/project.service";
import { Utility } from "../../../utill/utility";
import { TranUserSeachDivition } from "../../../api/tranUserSeachDivition";
import { TranUser } from "../../../api/tranUser";
import { UserRoleService } from 'src/app/web/service/user-role.service';
import { MstlovService } from "../../../service/mstlov.service";
import { DatePipe } from "@angular/common";
import { SESSION, KEYFILLTER } from "../../../utill/constants";
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { Dropdown } from 'src/app/web/api/Dropdown';
import { Project } from 'src/app/web/api/Project';

@Component({
    selector: 'app-create-project',
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe]
})
export class CreateProjectComponent implements OnInit {
    //list Project
    projects!: Project[];
    selectedProjects: Project[] = [];
    project: Project = {} as Project;


    //Dropdown
    dropdownTypeItemsYear: Dropdown[] = [];
    SelectItemsYear!: Dropdown; //Year
    dropdownTypeItemsTEST02: Dropdown[] = [];
    SelectItemsBudget!: Dropdown; //budget
    dropdownTypeItemsTEST03: Dropdown[] = [];
    SelectItemsProduct!: Dropdown; //product
    dropdownTypeItemsTEST04: Dropdown[] = [];
    SelectItemsCharacter!: Dropdown; //project_character
    dropdownTypeItemsTEST05: Dropdown[] = [];
    SelectItemsStrategic!: Dropdown; //strategic
    dropdownTypeItemsTEST06: Dropdown[] = [];
    SelectItemsAgency!: Dropdown; //agency
    dropdownTypeItemsUser: Dropdown[] = [];

    dropdownTypeItemsUserApprove: Dropdown[] = [];

    SelectItemsUser!: Dropdown; //Username
    SelectProponent!: Dropdown;
    SelectApprover!: Dropdown;
    requiredClassName :string = 'required'
    requiredUsername : string = ''

    keyFillter: any = KEYFILLTER;

    tranUser: TranUser = {} as TranUser;

    paramSerachtranUser: TranUser = {} as TranUser;

    listTranUser: TranUser[] = [];

    userprofiletypeInvalid: boolean = false;
    Myindex !:number;
    //Project
    project_id:number  =0 ;
    agency:number  =0 ;
    fiscal_year:number  =0 ;
    budget: string ='';
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
    period:string ='';
    created_date:string ='';
    created_by:string ='';
    updated_date:string ='';
    updated_by:string ='';
    
    //User Detail
    divisionName: string = '';
    divisionId: number = 0;
    selectedDivisionName: string = '';
    selectedDivisionId: number = 0;
    selectedLocationId: number = 0;
    


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
    selectedPosition: string = '';

    //dropdown Manager
    dropdownManagerItems: ObjDropdownManagerItem[] = [];
    selectedManager: string = '';

    //dropdown Status
    dropdownStatusItems: ObjDropdownItem[] = [];
    selectedStatus: string = '';


    selectedUserTypeMstLov: string = '';
    selectedAscCategoryMstLov: string = '';
    selectedUserAscRoleMstLov: string = '';
    selectedAscPositionMstLov: string = '';
    selectedPeriodMstLov: string = '';
    selectedPrefixMstLov: string = '';


    //validate
    positionInvalid: boolean = false;
    divisionInvalid: boolean = false;
    firstnameThInvalid: boolean = false;
    lastnameThInvalid: boolean = false;
    usernameInvalid: boolean = false;

    //user type id
    userTypeIdASC:string = '';
    userTypeIdNonASC:string = '';

    constructor(
        private projectService: ProjectService,
        private messageService: MessageService,
        private util: Utility,
        private userRoleService: UserRoleService,
        private confirmationService: ConfirmationService,
        private mstlovService: MstlovService,
        public datepipe: DatePipe,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.Myindex = 0;
        this.requiredUsername = this.requiredClassName

        this.getUsernameProject();
        this.getMstLovYear();
        this.getMstLovTEST02();
        this.getMstLovTEST03();
        this.getMstLov4();
        this.getMstLov5();
        this.getMstLov6();

        this.dropdownStatusItems.push(
            { name: 'Active', id: 'ACTIVE' },
            { name: 'InActive', id: 'INACTIVE' }
        );

        this.selectedStatus = 'ACTIVE'
      
    }

    getMstLovYear() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'YEAR' })
            .toPromise()
            .then((res: any) => {
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
    getMstLov6() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'TEST06' })
            .toPromise()
            .then((res: any) => {
                console.log(res.resultData);

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsTEST06.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                    
                });
            })
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
                    res.resultData.resultData4.forEach((value: any, key: string) => {
                        this.dropdownTypeItemsUserApprove.push({
                            name: value.user_name,
                            id: value.user_profile_id,
                        });
                    
                    });


                });
                this.Myindex = 1 }
            })
            .catch((err) => {});
    }





    displayShowDialogSearchDivision() {
        this.displayResponsiveSearchDivision = true;
        this.messageDataNotFound = '';
    }

    //ASC_POSITION

    selectedDivision() {
        this.tranUser.divId = this.divisionSelected.divId;
        this.tranUser.locationId = this.divisionSelected.locId;
        this.tranUser.orgId = this.divisionSelected.orgId;
        this.divisionName = this.divisionSelected.divisionName;
        this.displayResponsiveSearchDivision = false;
        this.tranUser.positionId = 0;

    }



    onItemChangeDivision(event: Event, data: TranUserSeachDivition) {
        this.divisionSelected = data;
    }

    onSelectPosition(event: any) {
        this.tranUser.positionId = event.value;
    }

    onSelectUserType(event: any) {
        if(this.userTypeIdASC == event.value){
            this.requiredUsername = ''
        }else{
            this.requiredUsername = this.requiredClassName
        }
    }


    setEventCalendar(event: any, mc: any, dateType: string) {

        let dateTime = new Date(event);
        let dateTimeStr = <any>this.datepipe.transform(dateTime, 'yyyy-MM-dd HH:mm');
        if (dateType == 'start') {
            this.tranUser.effectiveStartDate = dateTimeStr;
            console.log('start new toUTCString')
            console.log(dateTimeStr)
            if (!this.util.isEmpty(this.tranUser.effectiveEndDate)) {
                let calDate = this.util.calculateDiffDate(dateTimeStr, this.tranUser.effectiveEndDate);
                if (calDate < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'end date must more then start date' });
                }
            }
        } else {

            let calDate = this.util.calculateDiffDate(this.tranUser.effectiveStartDate, dateTimeStr);
            if (calDate < 0) {
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'end date must more then start date' });
            }
            console.log(' calDate ')
            console.log(calDate)
            console.log('end new toUTCString')
            console.log(dateTimeStr)
            this.tranUser.effectiveEndDate = dateTimeStr;

        }
    }

    createTranUser(index: number) {

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


        if (this.SelectProponent.name == 'Please Select') {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'require period',
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
                    project_id: this.project_id,
                    agency: this.SelectItemsAgency.name,
                    fiscal_year: this.SelectItemsYear.name,
                    budget: this.SelectItemsBudget.name,
                    product: this.SelectItemsProduct.name,
                    sub_product: this.sub_product,
                    project_name: this.project_name,
                    project_character: this.SelectItemsCharacter.name,
                    development_plan: this.plans,
                    strategic: this.SelectItemsStrategic.name,
                    goal: this.goal,
                    strategy: this.strategy,
                    measure: this.measure,
                    plans: this.plans,
                    reason: this.reason,
                    objective: this.objective,
                    target_group_student: this.target_group_student,
                    target_group_personnel: this.target_group_personnel,
                    target_group_outsider: this.target_group_outsider,
                    user_id: this.SelectItemsUser,
                    place: this.place,
                    startdate: this.startdate,
                    enddate: this.enddate,
                    implementation: this.implementation,
                    indicators: this.indicators,
                    cost: this.cost,
                    expect_result: this.expect_result,
                    project_evaluation: this.project_evaluation,
                    follow_up: this.expect_result,
                    project_proponent: this.SelectProponent,
                    project_approver: this.SelectApprover,
                    period: this.period,
                    principalNAME: tokendecode.sub,
                    token: token,
                };

                this.projectService
                    .createproject(body)
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
                this.router.navigate(['/transuser']);
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
}

interface ObjDropdownPositionItem {
    name: string;
    id: number;
}

interface ObjDropdownManagerItem {
    name: string;
    id: number;
}
