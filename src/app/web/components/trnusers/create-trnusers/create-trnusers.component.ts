import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransuserService } from "../../../service/transuser.service";
import { Utility } from "../../../utill/utility";
import { TranUserSeachDivition } from "../../../api/tranUserSeachDivition";
import { TranUser } from "../../../api/tranUser";
import { MstlovService } from "../../../service/mstlov.service";
import { DatePipe } from "@angular/common";
import { SESSION, KEYFILLTER } from "../../../utill/constants";
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';



@Component({
    selector: 'app-create-trnusers',
    templateUrl: './create-trnusers.component.html',
    styleUrls: ['./create-trnusers.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe]
})
export class CreateTrnusersComponent implements OnInit {


    requiredClassName :string = 'required'
    requiredUsername : string = ''

    keyFillter: any = KEYFILLTER;

    tranUser: TranUser = {} as TranUser;

    paramSerachtranUser: TranUser = {} as TranUser;

    listTranUser: TranUser[] = [];

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
    selectedPosition: string = '';

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
    dropdownPrefixMstLov: ObjDropdownItem[] = [];

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
        private transuserService: TransuserService,
        private messageService: MessageService,
        private util: Utility,
        private confirmationService: ConfirmationService,
        private mstlovService: MstlovService,
        public datepipe: DatePipe,
        private router: Router,
    ) {
    }

    ngOnInit() {

        
        this.requiredUsername = this.requiredClassName

        this.getPeriodMstLov()
        this.getUserTypeMstLov();
        this.getAscCategoryMstLov();
        this.getUserAscRoleMstLov();
        this.getAscPositionMstLov();
        this.getPrefixMstLov();

        this.dropdownStatusItems.push(
            { name: 'Active', id: 'ACTIVE' },
            { name: 'InActive', id: 'INACTIVE' }
        );

        this.selectedStatus = 'ACTIVE'
      
    }

    checkDuplicateUsername(){
        if(this.tranUser.username){
            console.log("Good : ", this.tranUser.username);
            this.transuserService.checkDuplicateUsername({ username: this.tranUser.username }).toPromise().then((res: any) => {
                console.log(res);
                if(res.status == 'success'){
                   if(!this.util.isEmpty(res.resultData)){
                     this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Username is already.' });
                     this.tranUser.username = ''
                   }
                }
            }).catch((err) => {
                
            });
        }
    }

    displayShowDialogSearchDivision() {
        this.displayResponsiveSearchDivision = true;
        this.messageDataNotFound = '';
    }


    getPrefixMstLov() {
        this.mstlovService.findMstLovByTypeName({ typename: 'PREFIX_TYPE' }).toPromise().then((res: any) => {
            //console.log(res.resultData);
            if(res.resultData){

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownPrefixMstLov.push({ name: value.lovName, id: value.lovId });
                });
            }

        }).catch((err) => {

        });
    }



    getUserTypeMstLov() {

        this.mstlovService.findMstLovByTypeName({ typename: 'USER_TYPE' }).toPromise().then((res: any) => {

            res.resultData.forEach((value: any, key: string) => {
                this.dropdownUserTypeMstLov.push({ name: value.lovName, id: value.lovId });
                if(value.lovName == 'NONASC'){
                    this.userTypeIdNonASC = value.lovId
                }else if(value.lovName == 'ASC'){
                    this.userTypeIdASC = value.lovId
                }
            });
            this.selectedUserTypeMstLov = this.userTypeIdNonASC
        }).catch((err) => {

        });
    }

    getPeriodMstLov() {

        this.mstlovService.findMstLovByTypeName({ typename: 'PERIOD' }).toPromise().then((res: any) => {
            res.resultData.forEach((value: any, key: string) => {
                this.dropdownPeriodMstLov.push({ name: value.lovName, id: value.lovId });
            });
        }).catch((err) => {

        });
    }


    getUserAscRoleMstLov() {
        this.mstlovService.findMstLovByTypeName({ typename: 'USER_ASC_ROLE' }).toPromise().then((res: any) => {
            res.resultData.forEach((value: any, key: string) => {
                this.dropdownUserAscRoleMstLov.push({ name: value.lovName, id: value.lovId });
            });
        }).catch((err) => {

        });
    }

    getAscCategoryMstLov() {

        this.mstlovService.findMstLovByTypeName({ typename: 'ASC_CATEGORY' }).toPromise().then((res: any) => {
            res.resultData.forEach((value: any, key: string) => {
                this.dropdownAscCategoryMstLov.push({ name: value.lovName, id: value.lovId });
            });
        }).catch((err) => {

        });
    }



    getAscPositionMstLov() {
        this.mstlovService.findMstLovByTypeName({ typename: 'ASC_POSITION' }).toPromise().then((res: any) => {
            res.resultData.forEach((value: any, key: string) => {
                this.dropdownAscPositionMstLov.push({ name: value.lovName, id: value.lovId });
            });
        }).catch((err) => {

        });
    }

    //ASC_POSITION

    selectedDivision() {
        this.tranUser.divId = this.divisionSelected.divId;
        this.tranUser.locationId = this.divisionSelected.locId;
        this.tranUser.orgId = this.divisionSelected.orgId;
        this.divisionName = this.divisionSelected.divisionName;
        this.displayResponsiveSearchDivision = false;
        this.tranUser.positionId = 0;
        this.searchPositionByDevId(this.tranUser.divId);
    }

    searchPositionByDevId(divid: number) {
        this.dropdownPositionItems = [];
        this.transuserService.searchPositionByDevId({ divid: divid }).toPromise().then((res: any) => {
            if (res.resultData) {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownPositionItems.push({
                        name: value.position_name,
                        id: value.position_id
                    });
                });
            }
        }).catch((err) => {
            //this.messageService.add({ severity: 'error', summary: 'Data fot found.', detail: 'Data fot found' });
        });
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

    
        if(this.tranUser.divId <= 0 || this.tranUser.divId == null){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Division is required.' })
            return;
        }
        if(this.tranUser.positionId <= 0 || this.tranUser.positionId == null){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Please select position.' })
            return;
        }

        if(this.userTypeIdASC != this.selectedUserTypeMstLov){
            if(this.util.isEmpty(this.tranUser.username)){
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Username is required.' })
                return;
            }
        }

        if(this.util.isEmpty(this.tranUser.firstname)){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Firstname (Th) is required.' })
            return;
        }

        if(this.util.isEmpty(this.tranUser.firstname)){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Lastname (Th) is required.' })
            return;
        }

        this.loading[index] = true;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                //set variable
                this.tranUser.userStatus = this.selectedStatus;
                this.tranUser.userType = this.selectedUserTypeMstLov;
                this.tranUser.ascCategory = this.selectedAscCategoryMstLov;
                this.tranUser.ascPosition = this.selectedAscPositionMstLov;
                this.tranUser.userRole = this.selectedUserAscRoleMstLov;
                this.tranUser.period = this.selectedPeriodMstLov;
                this.tranUser.prefixName = this.selectedPrefixMstLov;
                //get token
                let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
                token = JSON.parse(token)
                let tokendecode = jwt_decode<any>(token);
                this.tranUser.createdBy = tokendecode.sub;
                this.tranUser.updatedBy = tokendecode.sub;

                this.transuserService.create(this.tranUser).toPromise().then((res: any) => {
                    console.log(res);
                    if (res.status == 'success') {
                        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Success' });
                        this.loading[index] = false;

                        setTimeout(()=>{                           //<<<---using ()=> syntax
                            this.router.navigate(['/transuser']);
                       }, 1500);
                       
                    } else {
                        let resultMessage = res.resultMessage ? res.resultMessage : 'Process Failed';
                        this.messageService.add({ severity: 'error', summary: 'Failed', detail: resultMessage });
                        this.loading[index] = false;
                    }
                }).catch((err) => {
                    this.messageService.add({ severity: 'error', summary: 'Fail.', detail: 'Fail' });
                });
                this.loading[index] = false;
            }, reject: () => {
                this.loading[index] = false;
            }

        });
    }



    searchDivision() {

        console.log(this.kwDivision);

        this.transuserService.searchDivision({ name: this.kwDivision }).toPromise().then((res: any) => {
            console.log(res);
            if (res.status == 'success') {
                this.listDivision = res.resultData;
                console.log(this.listDivision)
                this.messageDataNotFound = 'data not found.';
            }
        }).catch((err) => {
            //this.messageService.add({ severity: 'error', summary: 'Data fot found.', detail: 'Data fot found' });
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
