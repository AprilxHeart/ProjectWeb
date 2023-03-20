import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import { Utility } from 'src/app/web/utill/utility';
import jwt_decode from 'jwt-decode';
import { SESSION } from 'src/app/web/utill/constants';
import { isNull } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { MstLov } from 'src/app/web/api/mstlov';

import {  DropdownMstType } from 'src/app/web/api/dropdownmsttype';
@Component({
  selector: 'app-list-mstlov',
  templateUrl: './list-mstlov.component.html',
  styleUrls: ['./list-mstlov.component.scss'],
providers: [ConfirmationService, MessageService],
})
export class ListMstlovComponent implements OnInit {

  constructor(
    private mstlovService: MstlovService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private util: Utility,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  mstlov!: MstLov[];
  EdtimstLov !: MstLov
  items!: MenuItem[];


  ddlType : DropdownMstType[] = []
  dropdownStatus = [
    { name: 'ACTIVE', id: '1' },
    { name: 'INACTIVE', id: '2' },
];

  selectedddlType !: DropdownMstType
  selectedddlEditType : string = '';
  selectmstStatus!: { name: 'ACTIVE'; id: '1' };

  typeInvalid: boolean = false;
  mststatusInvalid: boolean = false;
  nameInvalid: boolean = false;
  idInvalid: boolean = false;
  isFormInvalid: boolean = false;

  lovId: string = '';
  lovParentId !: any ;
  lovType : string = '';
  lovName : string = '';
  lovDes1 !: any ;
  lovDes2 !: any ;
  lovDes3 !: any ;
  lovDes4 !: any ;
  lovDes5!: any ;
  priority !: any ;;
  displayResponsiveCreateMstLov: boolean = false;
  displayResponsiveUpdateMstLov: boolean = false;

  stateOptions = [{label: 'Creat', value: 'off'}, {label: 'New Creat', value: 'on'}];
  value1: string = "off";

  bodyList: any = [
    {
        lovId:  '',
        lovType : '',
        lovParentId :   '',
        lovName :   '',
        lovDes1 :   '',
        lovDes2 :   '',
        lovDes3 :   '',
        lovDes4 :  '',
        lovDes5 :   '',
        priority :  '',
        lovStatus : '',
        principalNAME: ''
    },
];

bodyListFinal: any = [];

  ngOnInit(): void {

  this.findDivision()
  this.getMstType()


  }

  findDivision() {
    let body = {};
    this.mstlovService.findMstLov(body)
        .toPromise()
        .then((res: any) => {

            this.mstlov = res.resultData;
            console.log(this.mstlov)
        })
        .catch((err) => {});
}

getMstType() {
    let body = {};
    this.mstlovService
        .DDLtype(body)
        .toPromise()
        .then((res: any) => {
            res.resultData.forEach((value: any, key: string) => {
                this.ddlType.push({
                    name: value.lovType
                });
            });
            console.log(this.ddlType)
        })
        .catch((err) => {});
}

    showResponsiveDialogCreateMstLov() {
    this.displayResponsiveCreateMstLov = true
    this.lovId = '';
    this.lovParentId = '';
    this.lovName = '';
    this.lovDes1 = '';
    this.lovDes2  = '';
    this.lovDes3 = '';
    this.lovDes4 = '';
    this.lovDes5  = '';
    this.priority  = '';
}

showResponsiveDialogUpdateMstLov(mstlov : MstLov) {
    this.displayResponsiveUpdateMstLov = true
    this.EdtimstLov = {...mstlov}
    this.selectedddlEditType = this.EdtimstLov.lovType
    this.lovId = this.EdtimstLov.lovId;
    console.log(this.selectedddlEditType)
    console.log(this.displayResponsiveUpdateMstLov)
    this.lovParentId = this.EdtimstLov.lovParentId;
    this.lovName = this.EdtimstLov.lovName;
    this.lovDes1 = this.EdtimstLov.lovDes1;
    this.lovDes2  = this.EdtimstLov.lovDes2;
    this.lovDes3 = this.EdtimstLov.lovDes3;
    this.lovDes4 = this.EdtimstLov.lovDes4;
    this.lovDes5  = this.EdtimstLov.lovDes5;
    this.priority  = this.EdtimstLov.priority;
}

    creatListListLov()
    {
        if(this.util.isEmpty(this.selectedddlType) && this.value1=='off')
        {
            this.typeInvalid = true
            console.log(this.selectedddlType)
            return
        }
        if(this.util.isEmpty(this.lovType.trim) && this.value1=='on')
        {
            this.typeInvalid = true
            console.log(this.selectedddlType)
            return
        }
        if(this.util.isEmpty(this.lovId.trim()))
        {
            this.idInvalid = true
            console.log(this.lovId.trim())
            return
        }
        if(this.util.isEmpty(this.lovName.trim()))
        {
            this.nameInvalid = true
            console.log(this.lovName.trim())
            return
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

                if(this.value1 == 'on')
                {
                    this.bodyList = {
                        lovId:  this.lovId.trim(),
                        lovType : this.lovType.trim(),
                        lovParentId : this.lovParentId.trim(),
                        lovName :  this.lovName.trim(),
                        lovDes1 :   this.lovDes1.trim(),
                        lovDes2 :  this.lovDes2.trim(),
                        lovDes3 :  this.lovDes3.trim(),
                        lovDes4 : this.lovDes4.trim(),
                        lovDes5 :  this.lovDes5.trim(),
                        priority :  this.priority.trim(),
                        lovStatus : this.selectmstStatus.name,
                        principalNAME: tokendecode.sub
                    };
                }
                else{this.bodyList = {
                    lovId:  this.lovId.trim(),
                    lovType : this.selectedddlType.name,
                    lovParentId : this.lovParentId.trim(),
                    lovName :  this.lovName.trim(),
                    lovDes1 :   this.lovDes1.trim(),
                    lovDes2 :  this.lovDes2.trim(),
                    lovDes3 :  this.lovDes3.trim(),
                    lovDes4 : this.lovDes4.trim(),
                    lovDes5 :  this.lovDes5.trim(),
                    priority :  this.priority.trim(),
                    lovStatus : this.selectmstStatus.name,
                    principalNAME: tokendecode.sub,
                    check : this.value1
                };}
                console.log(this.bodyList)
                this.bodyListFinal.push(this.bodyList);

                this.mstlovService.creat(this.bodyList)
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
                            this.displayResponsiveCreateMstLov = false
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


                // this.bodyListFinal = this.bodyListFinal.map((x:any,index:any) => {
                //     x.idx = index
                //     return x
                // })

            },
        });
    }

    EditLov()
    {
        if(this.util.isEmpty(this.selectedddlEditType) )
        {
            this.typeInvalid = true
            console.log(this.selectedddlType)
            return
        }
        if(this.util.isEmpty(this.lovType.trim) )
        {
            this.typeInvalid = true
            console.log(this.selectedddlType)
            return
        }
        if(this.util.isEmpty(this.lovId.trim()))
        {
            this.idInvalid = true
            console.log(this.lovId.trim())
            return
        }
        if(this.util.isEmpty(this.lovName.trim()))
        {
            this.nameInvalid = true
            console.log(this.lovName.trim())
            return
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

                this.bodyList = {
                    lovId:  this.lovId.trim(),
                    lovType : this.selectedddlEditType,
                    lovParentId : this.lovParentId.trim(),
                    lovName :  this.lovName.trim(),
                    lovDes1 :   this.lovDes1.trim(),
                    lovDes2 :  this.lovDes2.trim(),
                    lovDes3 :  this.lovDes3.trim(),
                    lovDes4 : this.lovDes4.trim(),
                    lovDes5 :  this.lovDes5.trim(),
                    priority :  this.priority.trim(),
                    lovStatus : this.selectmstStatus.name,
                    principalNAME: tokendecode.sub,
                    check : this.value1
                };
                console.log(this.bodyList)
                this.bodyListFinal.push(this.bodyList);

                this.mstlovService.update(this.bodyList)
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
                            this.displayResponsiveUpdateMstLov = false
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


                // this.bodyListFinal = this.bodyListFinal.map((x:any,index:any) => {
                //     x.idx = index
                //     return x
                // })

            },
        });
    }



    selectButton()
    {

    }

    linkback() {

        {
            this.displayResponsiveCreateMstLov = false
        }

    }
}
