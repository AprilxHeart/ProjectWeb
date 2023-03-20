import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/web/api/product';
import { OrganizationService } from 'src/app/web/service/organization.service';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import jwt_decode from 'jwt-decode';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Organization } from 'src/app/web/api/organization';
import { DropdownOrganization } from 'src/app/web/api/dropdownOrganization';
import { Utility } from 'src/app/web/utill/utility';
import { KEYFILLTER, SESSION } from 'src/app/web/utill/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.scss'],
  providers: [ConfirmationService, MessageService]
})


export class ListOrganizationComponent implements OnInit {

  constructor(

    private organizationServive: OrganizationService,
    private mstlovService: MstlovService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private util: Utility,
    private router: Router,
    
  ) { 

  }


  displayResponsiveCreateOrg: boolean = false;
  displayResponsiveEditOrg: boolean = false;
  loading = [false, false]
  btnEditIsdisable: boolean = false;

  orgName!: string;
  orgStatusRadio: string = '';

  dropdownTypeItems: DropdownOrganization[] = [];
  selectedCreateOrgTypeMstLov!: DropdownOrganization;
  dropdownTypeMstLov: DropdownOrganization[] = [];
  selectedEditOrgTypeMstLovId: string = '';
  selectedEditOrgTypeMstLovName: string = '';

  submitted: boolean = false;
  statuses: any[] = [];
  products!: Product[];
  organizations!: Organization[];
  selectedOrganizations: Organization[] = [];
  organization!: Organization;
  product!: Product;
  selectedProducts: Product[] = [];
  organizationDialog: boolean = false;

  keyFillter: any = KEYFILLTER;

  ngOnInit(): void {

   
    this.dropdownTypeItems = [
      { name: 'Please Select', id: '' },
    ];
    this.getOrganizationMstLov();
    this.findOrganization();
    this.orgStatusRadio = 'ACTIVE';
    this.orgName = '';
    this.selectedCreateOrgTypeMstLov = { name: 'Please Select', id: '' };
    this.btnEditIsdisable = false;
  }

  isFormInvalid: boolean = false;
  orgnameInvalid: boolean = false;
  orgtypeInvalid: boolean = false;

  getOrganizationMstLov() {
    this.mstlovService.findMstLovByTypeName({ typename: 'ORGANAZATION_TYPE' }).toPromise().then((res: any) => {
      console.log(res.resultData);
      res.resultData.forEach((value: any, key: string) => {
        this.dropdownTypeItems.push({ name: value.lovName, id: value.lovId });
      });
    }).catch((err) => {

    });
  }

checkActiveDivition(orgId: number, status: string) {

    if (status == "INACTIVE") {

      this.organizationServive.checkActiveDivision({ orgid: orgId }).toPromise().then((res: any) => {
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


  }


  showResponsiveDialogCreateOrg() {
    this.displayResponsiveCreateOrg = true;
    this.orgName = '';
    this.selectedCreateOrgTypeMstLov = { name: 'Please Select', id: '' };
    this.orgStatusRadio = 'ACTIVE';
    this.isFormInvalid = false;
    this.orgnameInvalid = false;
    this.orgtypeInvalid = false;
  }

  showResponsiveDialogEditOrg(organization: Organization) {
    this.organization = { ...organization };
    this.selectedEditOrgTypeMstLovId = this.organization.orgTypeId;
    this.selectedEditOrgTypeMstLovName = this.organization.orgTypeName;
    this.displayResponsiveEditOrg = true;
    this.btnEditIsdisable = false;
    this.isFormInvalid = false;
    this.orgnameInvalid = false;
    this.orgtypeInvalid = false;

  }

  hideDialog() {
    this.organizationDialog = false;
    this.submitted = false;
  }

  findOrganization() {

    let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
    token = JSON.parse(token)
    let tokendecode = jwt_decode<any>(token);
    console.log(token)

    let body = {
      principalNAME: tokendecode.userName,
      token: token
    }

    this.organizationServive.findOrganization(JSON.stringify(body)).toPromise().then((res: any) => {

      console.log('--findOrganization--');
      console.log(res);
      console.log(JSON.stringify(res.resultData));
      this.organizations = res.resultData;

    }).catch((err) => {
      console.log(err);
    });

  }

  editOrganization(index: number) {

    if (!this.btnEditIsdisable) {

      if (this.util.isEmpty(this.organization.orgName.trim())) {
        this.orgnameInvalid = true;
      }else{
        this.orgnameInvalid = false;
      }         
      if (this.util.isEmpty(this.selectedEditOrgTypeMstLovId)) {
        this.orgtypeInvalid = true;
      }else{
        this.orgtypeInvalid = false;
      }

      if(!this.orgnameInvalid && !this.orgtypeInvalid){
        this.isFormInvalid = false;
      }else{
        this.isFormInvalid = true;
        return;
      }

      this.loading[index] = true;

      this.confirmationService.confirm({
        //target: event.target as EventTarget,
        message: 'Are you sure that you want to perform this action?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
          token = JSON.parse(token)
          let tokendecode = jwt_decode<any>(token);
          console.log('tokendecode--update');
          console.log(tokendecode);

          let body = {
            orgId: this.organization.orgId,
            orgName: this.organization.orgName.trim(),
            orgStatus: this.organization.orgStatus,
            orgTypeId: this.selectedEditOrgTypeMstLovId,
            orgTypeName: this.selectedEditOrgTypeMstLovName,
            principalNAME: tokendecode.sub,
            token: token
          }

          this.organizationServive.updateOrganization(body).toPromise().then((res: any) => {
            if (res.status == 'success') {
              this.findOrganization();
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Success' });
              this.loading[index] = false;
              this.displayResponsiveEditOrg = false;
            } else {
              let resultMessage = res.resultMessage ? res.resultMessage : 'Failed';
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: resultMessage });
              this.loading[index] = false;
            }

          }).catch((err) => {

            console.log('error : ' + err);
            this.loading[index] = false;
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Process Failed' });

          });
        },
        reject: () => {
          this.loading[index] = false;
        }
      });
    }
  }


  onChangeOrgType(value:any){

    console.log('event value:' + value);
    console.log(value);
    console.log(this.dropdownTypeItems);
    const ids = this.dropdownTypeItems.find(i => i.id === value);
    this.selectedEditOrgTypeMstLovName = <string> ids?.name;
    console.log(this.selectedEditOrgTypeMstLovName);
  }

  //

  linkCreateDivision(id:number){
    this.router.navigate(['/division',{ref: id}]);

  }


  createOrganization(index: number) {

    let orgType = this.selectedCreateOrgTypeMstLov;

    if (this.util.isEmpty(this.orgName.trim())) {
      this.orgnameInvalid = true;
    }else{
      this.orgnameInvalid = false;
    }   
    if (this.util.isEmpty(orgType.id)) {
      this.orgtypeInvalid = true;
    }else{
      this.orgtypeInvalid = false;
    }

    if(!this.orgnameInvalid && !this.orgtypeInvalid){
      this.isFormInvalid = false;
    }else{
      this.isFormInvalid = true;
      return;
    }

    this.confirmationService.confirm({
      //target: event.target as EventTarget,
      message: 'Are you sure that you want to perform this action?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.submitted = true;
        this.loading[index] = true;
        let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
        token = JSON.parse(token)
        let tokendecode = jwt_decode<any>(token);


        console.log(token)

        let body = {
          orgName: this.orgName.trim(),
          orgStatus: this.orgStatusRadio,
          orgTypeId: orgType.id,
          orgTypeName: orgType.name,
          principalNAME: tokendecode.sub,
          token: token
        }

        this.organizationServive.createOrganization(body).toPromise().then((res: any) => {

          console.log(res);

          if (res.status == 'success') {

            this.findOrganization();
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Success' });
            this.loading[index] = false;
            this.displayResponsiveCreateOrg = false;

          } else {

            let resultMessage = res.resultMessage ? res.resultMessage : 'Process Failed';
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: resultMessage });
            this.loading[index] = false;

          }

        }).catch((err) => {

          console.log('error : ' + err);
          this.loading[index] = false;
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Process Failed' });

        });

      },
      reject: () => {
        this.loading[index] = false;
      }
    });

  }




}

