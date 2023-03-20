import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { CountryService } from 'src/app/web/service/country.service';
import { TransuserService } from "../../../service/transuser.service";
import { Utility } from "../../../utill/utility";
import { TranUserSeachDivition } from "../../../api/tranUserSeachDivition";
import { TranUser } from "../../../api/tranUser";
import { MstlovService } from "../../../service/mstlov.service";
import { DatePipe } from "@angular/common";
import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION,KEYFILLTER } from "../../../utill/constants";

@Component({
    selector: 'app-edit-trnusers',
    templateUrl: './edit-trnusers.component.html',
    styleUrls: ['./edit-trnusers.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe]
})
export class EditTrnusersComponent implements OnInit {

    tranUser: TranUser = {} as TranUser;

    paramSerachtranUser: TranUser = {} as TranUser;

    listTranUser: TranUser[] = [];

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
        private transuserService: TransuserService,
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

        this.getTranUserById();
        //this.dropdownPositionItems.push({ name: 'Plase Select', id: 0 });
        //this.dropdownManagerItems.push({ name: 'Plase Select', id: 0 });

        this.dropdownStatusItems.push(
            { name: 'Active', id: 'ACTIVE',disabled: false },
            { name: 'InActive', id: 'INACTIVE',disabled: false }
        );

       
    }


    getTranUserById() {

        this.transuserService.findTranUserByUserId({ userId: this.refId }).toPromise().then((res: any) => {
            console.log('getTranUserById');
            console.log(res);
            console.log(res.resultData);
            this.tranUser = res.resultData;

            this.selectedPositionByDevId(this.tranUser.divId);

            this.tranUser.effectiveStartDateStr  =   this.datepipe.transform(this.tranUser.effectiveStartDate, 'yyyy-MM-dd HH:mm');
            if(!this.util.isEmpty(this.tranUser.effectiveEndDate)){
                this.tranUser.effectiveEndDateStr = this.datepipe.transform(this.tranUser.effectiveEndDate, 'yyyy-MM-dd HH:mm');
            }

            this.getPeriodMstLov(this.tranUser.period);
            this.getUserTypeMstLov(this.tranUser.userType);
            this.getAscCategoryMstLov(this.tranUser.ascCategory);
            this.getUserAscRoleMstLov(this.tranUser.userRole);
            this.getAscPositionMstLov(this.tranUser.ascPosition);
            this.getPrefixMstLov(this.tranUser.prefixName);

        }).catch((err) => {
            console.log(err);
        });

    }


    displayShowDialogSearchDivision() {
        this.displayResponsiveSearchDivision = true;
        this.messageDataNotFound = '';
    }

    
    getPrefixMstLov(refid:string) {

        this.dropdownPrefixMstLov.push({ name: 'Select', id: '', disabled: true })

        this.mstlovService.findMstLovByTypeName({ typename: 'PREFIX_TYPE' }).toPromise().then((res: any) => {

            res.resultData.forEach((value: any, key: string) => {
                this.dropdownPrefixMstLov.push({ name: value.lovName, id: value.lovId ,disabled: false});
            });
            this.tranUser.prefixName=refid;
        }).catch((err) => {

        });
    }

    getUserTypeMstLov(refid:string) {
        this.dropdownUserTypeMstLov.push({ name: 'Select', id: '' , disabled: true})
        this.mstlovService.findMstLovByTypeName({ typename: 'USER_TYPE' }).toPromise().then((res: any) => {

            res.resultData.forEach((value: any, key: string) => {
                this.dropdownUserTypeMstLov.push({ name: value.lovName, id: value.lovId,disabled: false });
            });
            this.tranUser.userType=refid;
        }).catch((err) => {

        });
    }

    getPeriodMstLov(refid:string) {
        this.dropdownPeriodMstLov.push({ name: 'Select', id: '',disabled: true })
        this.mstlovService.findMstLovByTypeName({ typename: 'PERIOD' }).toPromise().then((res: any) => {

            res.resultData.forEach((value: any, key: string) => {
                this.dropdownPeriodMstLov.push({ name: value.lovName, id: value.lovId ,disabled: false});
            });
            this.tranUser.period = refid;
        }).catch((err) => {

        });
    }


    getUserAscRoleMstLov(refid:string) {
        this.dropdownUserAscRoleMstLov.push({ name: 'Select', id: '',disabled: true})
        this.mstlovService.findMstLovByTypeName({ typename: 'USER_ASC_ROLE' }).toPromise().then((res: any) => {
  
            res.resultData.forEach((value: any, key: string) => {
                this.dropdownUserAscRoleMstLov.push({ name: value.lovName, id: value.lovId,disabled: false });
            });
            this.tranUser.userRole = refid;
        }).catch((err) => {

        });
    }

    getAscCategoryMstLov(refid:string) {
        this.dropdownAscCategoryMstLov.push({ name: 'Select', id: '',disabled: true })
        this.mstlovService.findMstLovByTypeName({ typename: 'ASC_CATEGORY' }).toPromise().then((res: any) => {

            res.resultData.forEach((value: any, key: string) => {
                this.dropdownAscCategoryMstLov.push({ name: value.lovName, id: value.lovId,disabled: false });
            });
            this.tranUser.ascCategory=refid;
        }).catch((err) => {

        });
    }



    getAscPositionMstLov(refid:string) {

        this.dropdownAscPositionMstLov.push({ name: 'Select', id: '',disabled: true });

        this.mstlovService.findMstLovByTypeName({ typename: 'ASC_POSITION' }).toPromise().then((res: any) => {

            res.resultData.forEach((value: any, key: string) => {
                this.dropdownAscPositionMstLov.push({ name: value.lovName, id: value.lovId,disabled: false });
            });
            this.tranUser.ascPosition=refid;
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

    selectedPositionByDevId(divId: number) {

        this.searchPositionByDevId(divId);

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

                this.selectedPosition = this.tranUser.positionId;

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



    setEventCalendar(event: any, mc: any, dateType: string) {

        let dateTime = new Date(event);
        let dateTimeStr = <any>this.datepipe.transform(dateTime, 'yyyy-MM-dd HH:mm');

        if (dateType == 'start') {
        
            if (!this.util.isEmpty(this.tranUser.effectiveEndDate)) {
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
    }

    updateTranUser(index: number) {

        if(this.tranUser.divId <= 0 || this.tranUser.divId == null){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Division is required.' })
            return;
        }
        if(this.tranUser.positionId <= 0 || this.tranUser.positionId == null){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Please select position.' })
            return;
        }

        /* if(this.userTypeIdASC != this.selectedUserTypeMstLov){
            if(this.util.isEmpty(this.tranUser.username)){
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Username is required.' })
                return;
            }
        } */

        if(this.util.isEmpty(this.tranUser.firstname)){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Firstname (Th) is required.' })
            return;
        }

        if(this.util.isEmpty(this.tranUser.firstname)){
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Lastname (Th) is required.' })
            return;
        }

        this.loading[index] = true;

        //get token
        let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
        token = JSON.parse(token)
        let tokendecode = jwt_decode<any>(token);
        //this.tranUser.createdBy = tokendecode.sub;
        this.tranUser.updatedBy = tokendecode.sub;

        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                console.log('edit this.tranUser');
                console.log(this.tranUser);

              //set variable
              this.transuserService.update(this.tranUser).toPromise().then((res: any) => {
                    console.log(res);
                    if (res.status == 'success') {
                        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Success' });
                        this.loading[index] = false;
                        setTimeout(()=>{                           //<<<---using ()=> syntax
                            this.router.navigate(['/transuser']);
                       }, 1500);
                    } else {
                        let resultMessage = res.resultMessage ? res.resultMessage : 'Process Failed';
                        this.messageService.add({ severity: 'error', summary: 'Failed.', detail: resultMessage });
                        this.loading[index] = false;
                    }

                }).catch((err) => {
                    this.messageService.add({ severity: 'error', summary: 'Failed.', detail: 'Fail' });
                }); 
                this.loading[index] = false;
            }, reject: () => {
                this.loading[index] = false;
            }

        });


    }



    searchDivision() {

        this.transuserService.searchDivision({ name: this.kwDivision }).toPromise().then((res: any) => {
            if (res.status == 'success') {
                this.listDivision = res.resultData;
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
