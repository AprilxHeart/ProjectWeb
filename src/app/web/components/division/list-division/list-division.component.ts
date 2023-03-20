import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/web/service/customer.service';
import { ProductService } from 'src/app/web/service/product.service';
import { DivisionService } from 'src/app/web/service/division.service';
import { OrganizationService } from 'src/app/web/service/organization.service';
import { LocationService } from 'src/app/web/service/location.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Division } from 'src/app/web/api/division';
import { Product } from 'src/app/web/api/product';
import { DropdownOrganization } from 'src/app/web/api/dropdownOrganization';
import { DropdownParentDivision } from 'src/app/web/api/dropdownParentDivision';
import { DropdownLocation } from 'src/app/web/api/dropdownLocation';
import { DropdownOrganizationAddType } from 'src/app/web/api/dropdownOrganizationAddType';
import { CheckParentDivision}  from 'src/app/web/api/checkParent';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import { Utility } from 'src/app/web/utill/utility';
import jwt_decode from 'jwt-decode';
import { SESSION } from 'src/app/web/utill/constants';
import { isNull } from 'util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-list-division',
    templateUrl: './list-division.component.html',
    styleUrls: ['./list-division.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ListDivisionComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private DivisionServive: DivisionService,
        private organizationServive: OrganizationService,
        private mstlovService: MstlovService,
        private locationService: LocationService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private util: Utility,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    division!: Division[];
    divisionedit!: Division;
    dropdownOrg: DropdownOrganizationAddType[] = [];
    selectedCreateOrgName!: DropdownOrganizationAddType;
    selectedCreateDivisionTypeMstLov!: DropdownOrganization;
    selectdivision: Division[] = [];
    selectdivisionStatus!: { name: 'ACTIVE'; id: '1' };
    selecteddivisionParent!: DropdownParentDivision;
    selectedLocation!: DropdownLocation;

    selectedEditOrgName: string = '';
    selectedEditDivisionTypeMstLov: string = '';
    selectedEditdivisionStatus: string = '';
    selectedEditdivisionParent!: number ;
    selectedEditLocation: string = '';
    divisionParentName: string = '';

    btnEditIsdisable: boolean = false;
    displayResponsiveCreateDivision: boolean = false;
    displayResponsiveEditDivision: boolean = false;
    divisionName!: string;
    divisionId!: number;
    divisionCode: string = '';
    divisionParent!: string;
    orgId!: any;
    orgType!: any;
    divisionTypeId!: any;
    divisionParentId!: number;
    locationId!: any;
    divisionFlag: string = '';
    dropdownTypeItems: DropdownOrganization[] = [];
    dropdownStatus = [
        { name: 'ACTIVE', id: '1' },
        { name: 'INACTIVE', id: '2' },
    ];
    dropdownLocation: DropdownLocation[] = [];
    dropdownParent: DropdownParentDivision[] = [];
    checkParent: CheckParentDivision[] = [];
    checkParentAndDiv!: CheckParentDivision[]
    products!: Product[];
    submitted: boolean = false;
    statuses: any[] = [];
    items!: MenuItem[];
    checkName=1
    bodyList: any = [
        {
            divParentId: null,
            orgId: '',
            locId: '',
            divisionCode: '',
            divisionName: '',
            divisionStatus: '',
            divisionType: '',
            partnerFlag: '',
            principalNAME: '',
        },
    ];

    bodyListFinal: any = [];

    orgRefId: number = 0;

    ngOnInit(): void {


        //param
        this.route.params.subscribe(params => {
            if (params['ref']) {
                (1)
                this.orgRefId = parseInt(params['ref']);
            }
        });


        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.findDivision();
        this.dropdownTypeItems = [{ name: 'Please Select', id: '' }];
        this.getDivisionMstLov();
        this.getDropdownListOranization();
        this.dropdownOrg = [{ name: 'Please Select', id: null, type: '' }];

        this.dropdownStatus;
        this.dropdownLocation = [{ name: 'Please Select', id: null }];
        this.dropdownParent = [{ name: 'Select', id: null }];
        this.getDropdownLocation();
        this.selectedCreateOrgName = {
            name: 'Please Select',
            id: '',
            type: ' ',
        };
        this.selectedCreateDivisionTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.selectdivisionStatus;
        this.selecteddivisionParent = { name: 'Please Select', id: null };
        this.selectedLocation = { name: 'Please Select', id: '' };
        this.getcheckDivisionName('01')

        this.btnEditIsdisable = false;
    }
    isFormInvalid: boolean = false;
    orgnameInvalid: boolean = false;
    divisionnameInvalid: boolean = false;
    divisionstatusInvalid: boolean = false;

    findDivision() {
        let body = {};
        this.DivisionServive.findDivision(body)
            .toPromise()
            .then((res: any) => {

                this.division = res.resultData;
                console.log(this.division)
            })
            .catch((err) => {});
    }

    checkDivisionParentAndDiv(data : number) {
        let body = {
            divId: Number(data),
        };
        this.DivisionServive.checkDivisionParentAndDiv(body)
            .toPromise()
            .then((res: any) => {

                this.checkParentAndDiv = res.resultData;
                console.log(this.checkParentAndDiv)
            })
            .catch((err) => {});
    }

    getDivisionMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'DIVISION_TYPE' })
            .toPromise()
            .then((res: any) => {

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItems.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                });
            })
            .catch((err) => {});
    }

    getDropdownListOranization() {
        let body = {};
        this.organizationServive
            .getDropdownListOranization(body)
            .toPromise()
            .then((res: any) => {

                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownOrg.push({
                        name: value.orgName,
                        id: value.orgId,
                        type: value.orgTypeName,
                    });
                });
                if(this.orgRefId > 0){
                    this.displayResponsiveCreateDivision = true;
                    this.orgId = this.orgRefId
                    this.dropdownOrg.forEach((value: any, key: any) => {
                         if(value.id == this.orgRefId)
                         {  this.divisionName = '';
                            this.dropdownOrg = [{ name: value.name, id: value.id, type: value.type }];
                            if (value.type == 'ORG_Partner') {
                                this.divisionFlag = 'ACTIVE';
                            }
                            if (value.type != 'ORG_Partner') {
                                this.divisionFlag = 'INACTIVE';
                            }
                            this.getDropdownCreatDivisionParent(value.id);
                         }
                    });

                }
                console.log(this.dropdownOrg)
            })
            .catch((err) => {});
    }

    getDropdownLocation() {
        let body = {};
        this.locationService
            .dropdownLocation(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownLocation.push({
                        name: value.locNameTh,
                        id: value.locId,
                    });
                });
                console.log(this.dropdownLocation);
            })
            .catch((err) => {});
    }
    getDropdownDivisionParent(data: any, parentId: number) {
        let body = {
            orgId: Number(data),
        };
        this.DivisionServive.dropdownDivisionParent(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownParent.push({
                        name: value.divisionName,
                        id: value.divId,
                    });
                });
                console.log(this.dropdownParent);
                this.selectedEditdivisionParent = parentId;
            })
            .catch((err) => {});
    }

    getDropdownCreatDivisionParent(data: any) {
        let body = {
            orgId: Number(data),
        };
        this.DivisionServive.dropdownDivisionParent(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownParent.push({
                        name: value.divisionName,
                        id: value.divId,
                    });
                });

            })
            .catch((err) => {});
    }

    getcheckDivisionParent(parentId: number) {
        let body = {
            divParentId: Number(parentId),
        };
        this.DivisionServive.checkDivisionParent(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.checkParent.push({
                        divId: value.divId,
                        divParentId: value.divParentId,
                    });
                });
                console.log(this.divisionId)
                let check = 0
               for(let i = 0 ; i<  this.checkParent.length;i++)
               {    console.log( this.checkParent[i])
                    if(this.divisionId ==  this.checkParent[i].divId)
                    {
                            check = 1
                    }
                    else if(parentId == 1)
                    {
                            check = 0
                    }
               }
               if(check == 1)
               {
                this.messageService.add({
                             severity: 'error',
                             summary: 'Failed',
                             detail: 'ไม่สามารถเลือก Parent นี้ได้',
                        });
                        this.selectedEditdivisionParent = 0
               }
            })
            .catch((err) => {});
    }

    getcheckDivisionName(divisionName: string) {
        let body = {
            divisionName: divisionName,
        };
        this.DivisionServive.checkDivisionName(body)
            .toPromise()
            .then((res: any) => {
                if(res.resultData.length != 0)
                {   this.checkName = 0
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Failed',
                        detail: 'divisionName Dup',
                   });
                   this.divisionName = ''
                }
            })
            .catch((err) => {});
    }

    showResponsiveDialogCreateDivision() {
        this.displayResponsiveCreateDivision = true;

        this.bodyListFinal = []

        this.divisionName = '';
        this.divisionCode = '';
        this.orgnameInvalid = false;
        this.divisionnameInvalid = false;
        this.divisionstatusInvalid = false;
        this.selectedCreateOrgName = {
            name: 'Please Select',
            id: '',
            type: '',
        };
        this.selectedCreateDivisionTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.selectdivisionStatus;
        this.selecteddivisionParent = { name: 'Please Select', id: '' };
        this.selectedLocation = { name: 'Please Select', id: '' };
    }

    showResponsiveDialogEditDivision(division: Division) {
        this.displayResponsiveEditDivision = true;
        this.divisionedit = { ...division };
        this.dropdownParent = [{ name: 'Select', id: '' }];
        this.getDropdownDivisionParent(
            this.divisionedit.orgId,
            Number(this.divisionedit.divParentId)
        );
        this.checkDivisionParentAndDiv(Number(this.divisionedit.divId))
        if(this.checkDivisionParentAndDiv.length > 0)
        {
            this.dropdownStatus = [
                { name: 'ACTIVE', id: '1' }
            ];
        }

        this.divisionId = Number(this.divisionedit.divId)
        this.divisionName = this.divisionedit.divisionName;
        this.divisionCode = this.divisionedit.divisionCode;
        this.orgnameInvalid = false;
        this.divisionnameInvalid = false;
        this.divisionstatusInvalid = false;
        this.selectedEditOrgName = this.divisionedit.orgName;
        this.selectedEditDivisionTypeMstLov = this.divisionedit.divisionType;
        this.selectedEditdivisionStatus = this.divisionedit.divisionStatus;
        this.selectedEditLocation = this.divisionedit.locName;
        if (this.divisionedit.partnerFlag == 'Y') {
            this.divisionFlag = 'ACTIVE';
        }
        if (this.divisionedit.partnerFlag == 'N') {
            this.divisionFlag = 'INACTIVE';
        }
    }

    defaultFlag() {
        console.log("/////////////////////////")
        console.log(this.selectedCreateOrgName.type)
        if (this.selectedCreateOrgName.type == 'ORG_Partner') {
            this.divisionFlag = 'ACTIVE';
        }
        if (this.selectedCreateOrgName.type != 'ORG_Partner') {
            this.divisionFlag = 'INACTIVE';
        }

        this.dropdownParent = [{ name: 'Select', id: '' }];
        this.getDropdownCreatDivisionParent(this.selectedCreateOrgName.id);
    }




    defaultEditFlag() {
        let orgTypeEdit;
        for (let i = 0; i < this.dropdownOrg.length; i++) {
            if (this.dropdownOrg[i].name == this.selectedEditOrgName) {
                orgTypeEdit = this.dropdownOrg[i].type;
            }

        if (orgTypeEdit == 'ORG_Partner') {
            this.divisionFlag = 'ACTIVE';
        }
        if (orgTypeEdit != 'ORG_Partner') {
            this.divisionFlag = 'INACTIVE';
        }

    }
}

    checkParentDropdown(data : any)
    {   this.checkParent=[{ divId: 0, divParentId: 0 }];
        this.getcheckDivisionParent(data)
    }

    updateDivision() {
        let orgName = this.selectedEditOrgName;
        let divisionType = this.selectedEditDivisionTypeMstLov;
        let location = this.selectedEditLocation;

        for (let i = 0; i < this.dropdownOrg.length; i++) {
            if (orgName == this.dropdownOrg[i].name) {
                this.orgId = this.dropdownOrg[i].id;
            }
        }

        for (let i = 0; i < this.dropdownLocation.length; i++) {
            if (location == this.dropdownLocation[i].name) {
                this.locationId = this.dropdownLocation[i].id;
            }
        }

        console.log(this.locationId);

        if (this.util.isEmpty(this.divisionCode.trim())) {
            this.divisionCode = '';
            console.log(this.divisionCode);
        }
        if (this.util.isEmpty(this.orgId)) {
            this.orgnameInvalid = true;
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'กรุณากรอก Organization Name' });
            return
        }
        if (this.util.isEmpty(this.divisionName.trim())) {
            this.divisionnameInvalid = true;
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'กรุณากรอก Division Name' });
            return
        }
        if (this.util.isEmpty(this.selectedEditdivisionStatus)) {
            this.divisionstatusInvalid = true;
            this.isFormInvalid = true;
        }
        if (this.divisionFlag == 'ACTIVE') {
            this.divisionFlag = 'Y';
        }
        if (this.divisionFlag == 'INACTIVE') {
            this.divisionFlag = 'N';
        }
        if (this.isFormInvalid) {
            return;
        }

        console.log(' divId:' + this.divisionedit.divId);
        console.log('divParentId: ' + this.selectedEditdivisionParent);
        console.log('orgId:' + this.orgId);
        console.log('locId:' + this.locationId);
        console.log('divisionCode:' + this.divisionCode);
        console.log('divisionName:' + this.divisionName.trim());
        console.log('divisionStatus:' + this.selectedEditdivisionStatus);
        console.log('divisionType:' + divisionType);
        console.log('partnerFlag:' + this.divisionFlag);

        this.confirmationService.confirm({
            //target: event.target as EventTarget,
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.submitted = true;
                let token = JSON.stringify(
                    localStorage.getItem(SESSION.SESSION_ID)
                );
                token = JSON.parse(token);
                let tokendecode = jwt_decode<any>(token);

                console.log(token);

                let body = {
                    divId: this.divisionedit.divId,
                    divParentId: Number(this.selectedEditdivisionParent),
                    orgId: Number(this.orgId),
                    locId: Number(this.locationId),
                    divisionCode: this.divisionCode,
                    divisionName: this.divisionName.trim(),
                    divisionStatus: this.selectedEditdivisionStatus,
                    divisionType: divisionType,
                    partnerFlag: this.divisionFlag,
                    principalNAME: tokendecode.sub,
                };
                console.log(body);

                this.DivisionServive.updateDivision(body)
                    .toPromise()
                    .then((res: any) => {
                        console.log(res);

                        if (res.status == 'success') {
                            console.log('Success');
                            this.findDivision();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'Success',
                            });
                            this.displayResponsiveEditDivision = false;
                        } else {
                            let resultMessage = res.resultMessage
                                ? res.resultMessage
                                : 'Process Failed';
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Failed',
                                detail: resultMessage,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log('error : ' + err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Failed',
                            detail: 'Process Failed',
                        });
                    });
            },
        });
    }

    creatDivision() {
        if(this.bodyListFinal.length<=0)
        {
            this.messageService.add({ severity: 'error', summary: 'Division Name Failed', detail: 'กรุณากด Add Division' });
            console.log(this.messageService.add)
        }
        else{
            this.confirmationService.confirm({
                //target: event.target as EventTarget,
                message: 'Are you sure that you want to perform this action?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.submitted = true;
                    let token = JSON.stringify(
                        localStorage.getItem(SESSION.SESSION_ID)
                    );
                    token = JSON.parse(token);
                    let tokendecode = jwt_decode<any>(token);

                    console.log(token);

                    for (let i = 0; i < this.bodyListFinal.length; i++) {
                        console.log(this.bodyListFinal[i])
                        this.DivisionServive.createDivision(this.bodyListFinal[i])
                            
                            .toPromise()
                            .then((res: any) => {
                                console.log(res);

                                if (res.status == 'success') {
                                    console.log('Success');
                                    this.findDivision();
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Confirmed',
                                        detail: 'Success',
                                    });
                                    if(this.orgRefId>0)
        {
            this.router.navigate(['/division/back']);
        }
        else
        {
            this.displayResponsiveCreateDivision = false
        }
                                } else {
                                    let resultMessage = res.resultMessage
                                        ? res.resultMessage
                                        : 'Process Failed';
                                    this.messageService.add({
                                        severity: 'error',
                                        summary: 'Failed',
                                        detail: resultMessage,
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log('error : ' + err);
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Failed',
                                    detail: 'Process Failed',
                                });
                            });
                    }
                },
            });
        }

    }

    creatListDivision() {
        let org = this.selectedCreateOrgName;
        let divisionType = this.selectedCreateDivisionTypeMstLov;
        let divisionStatus = this.selectdivisionStatus;
        let divisionParent = this.selecteddivisionParent.id;
        let location = this.selectedLocation;
        let regex = new RegExp("^[a-zA-Z0-9-ก-ฮ]+$");
        this.checkName=1
        console.log(this.divisionName.trim())
        this.getcheckDivisionName(this.divisionName.trim())

        if (this.util.isEmpty(org.id)) {
            this.orgnameInvalid = true;
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'กรุณากรอก Organization Name' });
            return
        }
        if (this.util.isEmpty(this.divisionName.trim())) {
            this.divisionnameInvalid = true;
            this.messageService.add({ severity: 'error', summary: 'Division Name Failed', detail: 'กรุณากรอก Division Name' });
            console.log(this.messageService.add)
            return
        }
        if(!regex.test(this.divisionName.trim()))
        {
            this.divisionnameInvalid = true;
            this.messageService.add({ severity: 'error', summary: 'Division Name Failed', detail: 'กรุณากรอกข้อมูลให้ถูกต้อง' });
            console.log(this.messageService.add)
            return
        }
        if (this.util.isEmpty(divisionParent)) {
            console.log( divisionParent+"sssssssssssssssssssssssssssssss")
            divisionParent= null
        }
        if (this.util.isEmpty(divisionStatus.name)) {
            this.divisionstatusInvalid = true;

        }
        if (this.divisionFlag == 'ACTIVE') {
            this.divisionFlag = 'Y';
        }
        if (this.divisionFlag == 'INACTIVE') {
            this.divisionFlag = 'N';
        }
        if (this.isFormInvalid) {
            return;
        }

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
            if(this.checkName == 0)
            {
                this.defaultFlag()
            }
               if(this.checkName != 0){
                this.bodyList = {
                    divParentId:divisionParent,
                    orgId: org.id,
                    locId: location.id,
                    divisionCode: this.divisionCode.trim(),
                    divisionName: this.divisionName.trim(),
                    divisionStatus: divisionStatus.name,
                    divisionType: divisionType.name,
                    partnerFlag: this.divisionFlag,
                    principalNAME: tokendecode.sub,
                };
                if (org.type == 'ORG_Partner') {
                    this.divisionFlag = 'ACTIVE';
                }
                if (org.type != 'ORG_Partner') {
                    this.divisionFlag = 'INACTIVE';
                }
                this.bodyListFinal.push(this.bodyList);

                this.bodyListFinal = this.bodyListFinal.map((x:any,index:any) => {
                    x.idx = index
                    return x
                })
                console.log(this.bodyListFinal);
                this.divisionName = '';
                this.divisionCode = '';
                this.orgnameInvalid = false;
                this.divisionnameInvalid = false;
                this.divisionstatusInvalid = false;
                this.selectedCreateOrgName = {
                    name: 'Please Select',
                    id: '',
                    type: '',
                };
                this.selectedCreateDivisionTypeMstLov = {
                    name: 'Please Select',
                    id: '',
                };
                this.selectdivisionStatus;
                this.selecteddivisionParent = { name: 'Please Select', id: null };
                this.selectedLocation = { name: 'Please Select', id: '' };
               }

            },
        });
    }
    linkCreatePosition(data:number)
    {
        this.router.navigate(['/position',{ref: data}]);
    }

    deleteList(idx:any){
        this.bodyListFinal.splice(idx, 1)
    }
    linkback() {
        if(this.orgRefId>0)
        {
            this.router.navigate(['/division/back']);
        }
        else
        {
            this.displayResponsiveCreateDivision = false
        }

    }
}
