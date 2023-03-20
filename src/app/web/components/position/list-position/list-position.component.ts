import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/web/api/product';
import { ProductService } from 'src/app/web/service/product.service';
import { PositionService } from 'src/app/web/service/position.service';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import jwt_decode from 'jwt-decode';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Position } from 'src/app/web/api/position';
import { DropdownPosition } from 'src/app/web/api/dropdownPosition';
import { DropdownPositionNumber } from 'src/app/web/api/dropdownPositionNumber';
import { Table } from 'primeng/table';
import { Utility } from 'src/app/web/utill/utility';
import { DropdownDivOrgID } from 'src/app/web/api/DropdownDivOrgID';
import { CheckParent } from 'src/app/web/api/checkParentID';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-list-position',
    templateUrl: './list-position.component.html',
    styleUrls: ['./list-position.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ListPositionComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private PositionServive: PositionService,
        private mstlovService: MstlovService,
        private util: Utility,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {}

    PositionStatusRadio: string = '';

    PositionFlagRadio: string = '';

    productDialog: boolean = false;
    divisionId!: number;
    products: Product[] = [];
    mylistdata: any = [];
    product: Product = {};
    bodyListFinal: any = [];
    selectedProducts: Product[] = [];
    items!: MenuItem[];
    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    displayResponsiveCreatePosition: boolean = false;
    displayResponsiveEditPosition: boolean = false;
    lockdivision: boolean = false;
    loading = [false, false];
    btnEditIsdisable: boolean = false;
    position_name!: string;
    checkParent: CheckParent[] = [];
    dropdownTypeItems: DropdownPosition[] = [];
    dropdownTypeItemsDivision: DropdownDivOrgID[] = ([] = [] = []);
    dropdownTypeItemsParent: DropdownPositionNumber[] = [];
    dropdownTypeItemsParent2: DropdownPositionNumber[] = [];
    selectedCreatePositionTypeMstLov!: DropdownPosition;
    selectedCreateDivition!: DropdownDivOrgID;
    selectedCreatePositionPARENT!: DropdownPositionNumber;

    dropdownTypeMstLov: DropdownPosition[] = [];
    selectedEditPositionTypeMstLovId: string = '';
    selectedEditPositionTypeMstLovIdd: number = 0;
    selectedEditPositionTypeMstLovName: string = '';
    selectedEditPositionPARENTNAME: string = '';
    selectedEditDivition: number = 0;
    selectedEditORGID: number = 0;
    selectedEditPositionPARENT: number = 0;

    positions!: Position[];
    selectedpositions: Position[] = [];
    position!: Position;
    PositionDialog: boolean = false;
    DivRefId: number = 0;

    ngOnInit(): void {
        //param
        this.route.params.subscribe((params) => {
            if (params['ref']) {
                1;
                this.DivRefId = parseInt(params['ref']);
            }
        });

        this.dropdownTypeItemsDivision.push({
            name: 'Please Select',
            id: 0,
            org_id: 0,
            org_name: '',
        });

        this.dropdownTypeItemsParent.push({
            name: 'Please Select',
            id: 0,
        });

        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.dropdownTypeItems = [{ name: 'Please Select', id: '' }];
        this.getPositionMstLov();

        this.findPosition();
        this.PositionStatusRadio = 'ACTIVE';
        this.PositionFlagRadio = 'Y';
        this.position_name = '';
        /* this.selectedCreateDivition.name = 'Please Select';
        this.selectedCreateDivition.id = 0; */
        this.selectedCreatePositionTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.selectedCreatePositionPARENT = { name: 'Please Select', id: 0 };
    }

    isFormInvalid: boolean = false;
    position_nameInvalid: boolean = false;
    position_typeInvalid: boolean = false;

    getPositionMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'POSITION_TYPE' })
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

    testChange() {
        console.log(this.position_name);
    }

    showResponsiveDialogCreatePosition() {
        this.lockdivision = false;
        this.displayResponsiveCreatePosition = true;
        this.position_name = '';
        this.selectedCreateDivition = {
            name: 'Please Select',
            id: 0,
            org_name: 'Please Select',
            org_id: 0,
        };
        this.selectedCreatePositionTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        

        this.dropdownTypeItemsParent2 = [{ name: 'Please Select', id: 0 }];

        /* this.selectedCreateDivition.name = 'Please Select';
        this.selectedCreateDivition.id = 0; */
        this.selectedCreatePositionPARENT = { name: 'Please Select', id: 0 };
        this.PositionStatusRadio = 'ACTIVE';
        this.PositionFlagRadio = 'INACTIVE';
        this.isFormInvalid = false;
        this.position_nameInvalid = false;
        this.position_typeInvalid = false;
    }

    showResponsiveDialogEditPosition(position: Position) {
        this.position = { ...position };

        this.selectedEditPositionTypeMstLovId = this.position.position_type;
        this.selectedEditPositionTypeMstLovName = this.position.position_type;
        this.selectedEditDivition = this.position.div_id;
        this.selectedEditORGID = this.position.org_id;
        this.selectedEditPositionPARENT = this.position.position_parent_id;
        this.selectedEditPositionPARENTNAME = this.position.position_name1;
        this.displayResponsiveEditPosition = true;

        this.isFormInvalid = false;
        this.position_nameInvalid = false;
        this.position_typeInvalid = false;
        this.defaultFlag2();
    }
    testchange() {
        console.log(this.selectedEditPositionTypeMstLovId);
    }

    hideDialog() {
        this.PositionDialog = false;
        this.submitted = false;
    }

    getcheckPositionParent(position_id: number) {
        let body = {
            position_id: Number(position_id),
        };
        this.PositionServive.checkPositionParent(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.checkParent.push({
                        Id: value.position_id,
                        ParentId: value.position_parent_id,
                    });
                });
                console.log('my position ID : ' + this.position.position_id);
                let check = 0;
                for (let i = 0; i < this.checkParent.length; i++) {
                    console.log(this.checkParent[i]);
                    if (this.position.position_id == this.checkParent[i].Id) {
                        check = 1;
                    } else if (this.position.position_id == 1) {
                        check = 0;
                    }
                }
                if (check == 1) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Failed',
                        detail: 'ไม่สามารถเลือก Parent นี้ได้',
                    });
                    this.selectedEditPositionPARENT = 0;
                }
            })
            .catch((err) => {});
    }

    findPosition() {
        let token = JSON.stringify(localStorage.getItem('sessionid'));
        token = JSON.parse(token);
        let tokendecode = jwt_decode<any>(token);
        console.log(token, tokendecode);

        let body = {
            principalNAME: tokendecode.userName,
            token: token,
        };
        console.log(token, tokendecode);

        this.PositionServive.findPosition(body)
            .toPromise()
            .then((res: any) => {
                this.positions = res.resultData.resultData1;


                res.resultData.resultData2.forEach(
                    (value: any, key: string) => {
                        let idx = this.dropdownTypeItemsDivision.findIndex(
                            (x) => x.id === value.div_id
                        );
                        if (idx === -1) {
                            this.dropdownTypeItemsDivision.push({
                                name: value.division_name,
                                id: value.div_id,
                                org_id: value.org_id,
                                org_name: value.org_name,
                            });
                        }
                    }
                );


/*                 res.resultData.resultData3.forEach(
                    (value: any, key: string) => {
                        this.dropdownTypeItemsParent.push({
                            name: value.position_name,
                            id: value.position_id,
                        });
                    }
                ); */

                console.log('--findPosition--');
                console.log(res);
                console.log(JSON.stringify(res.resultData.resultData1));
                console.log(token, tokendecode.sub);

                if (this.DivRefId > 0) {
                    this.displayResponsiveCreatePosition = true;
                    let checkdiv = this.dropdownTypeItemsDivision.findIndex(
                        (div) => div.id == this.DivRefId
                    );
                    this.getDropdownCreatPositionParent(this.DivRefId);
                    this.selectedCreateDivition =
                        this.dropdownTypeItemsDivision[checkdiv];
                    this.PositionFlagRadio = 'INACTIVE';
                    this.lockdivision = true;

                }
            })
            .catch((err) => {});
    }

    checkParentDropdown(data: any) {
        this.checkParent = [{ Id: 0, ParentId: 0 }];
        this.getcheckPositionParent(data);
    }

    editPosition(index: number) {
        if (!this.btnEditIsdisable) {
            if (this.util.isEmpty(this.position.position_name.trim())) {
                this.position_nameInvalid = true;
                this.isFormInvalid = true;
            }
            if (this.util.isEmpty(this.selectedEditPositionTypeMstLovId)) {
                this.position_typeInvalid = true;
                this.isFormInvalid = true;
            }

            if (this.isFormInvalid) {
                return;
            }
            this.loading[index] = true;

            this.confirmationService.confirm({
                //target: event.target as EventTarget,
                message: 'Are you sure that you want to perform this action?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    let token = JSON.stringify(
                        localStorage.getItem('sessionid')
                    );
                    token = JSON.parse(token);
                    let tokendecode = jwt_decode<any>(token);

                    let body = {
                        org_id: this.selectedEditORGID,
                        div_id: this.selectedEditDivition,
                        position_id: this.position.position_id,
                        position_name: this.position.position_name,
                        approve_flag: this.position.approve_flag,
                        position_status: this.position.position_status,
                        position_type: this.selectedEditPositionTypeMstLovId,
                        position_parent_id: this.selectedEditPositionPARENT,
                        principalNAME: tokendecode.sub,
                        token: token,
                    };

                    this.PositionServive.updatePosition(body)
                        .toPromise()
                        .then((res: any) => {
                            console.log(res);

                            if (res.status == 'success') {
                                this.findPosition();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Confirmed',
                                    detail: 'Success',
                                });
                                this.loading[index] = false;
                                this.displayResponsiveEditPosition = false;
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
            });
        }
    }

    deletelist(idx: any) {
        let index = this.mylistdata.findIndex(
            (e: { idx: any }) => e.idx == idx
        );
        this.mylistdata.splice(index, 1);
        console.log(index);
    }

    creatListPosition() {
        let token = JSON.stringify(localStorage.getItem('sessionid'));
        token = JSON.parse(token);
        let tokendecode = jwt_decode<any>(token);

        console.log('this.mylistdata', this.mylistdata)
        let dupdata = this.mylistdata.findIndex((x: any) => x.div_id == this.selectedCreateDivition.id && x.position_name == this.position_name);
        if (dupdata > -1){
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'ข้อมูลซ้ำ',
            });
            return;
        }

        if (this.selectedCreateDivition.id == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Require division',
            });
            return;
        }

        var regex = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z\u0E00-\u0E7F0-9])[a-zA-Z\u0E00-\u0E7F0-9 '~?!]{2,}$/;

        if (this.position_name == '' ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'ค่าว่าง',
            });
            return;
        }else if (!regex.test(this.position_name)){
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'กรอกข้อมูลไม่ถูกต้อง',
            });
            return;
        }
        console.log(regex.test(this.position_name));
        let data = {
            org_id: this.selectedCreateDivition.org_id,
            div_name: this.selectedCreateDivition.name,
            org_name: this.selectedCreateDivition.org_name,
            div_id: this.selectedCreateDivition.id,
            position_name: this.position_name,
            position_status: this.PositionStatusRadio,
            approve_flag: this.PositionFlagRadio,
            position_type:this.selectedCreatePositionTypeMstLov.name == 'Please Select' ? null: this.selectedCreatePositionTypeMstLov.name,
            position_type_id: this.selectedCreatePositionTypeMstLov.id,
            /* position_parent_id: this.selectedCreatePositionPARENT.id==0?null:this.selectedCreatePositionPARENT.id, */
            position_parent:this.selectedCreatePositionPARENT.name == 'Please Select' ? null: this.selectedCreatePositionPARENT.name,
            principalNAME: tokendecode.sub,
            token: token,
        };
        this.mylistdata.push(data);

        this.mylistdata = this.mylistdata.map((x: any, index: any) => {
            x.idx = index;
            return x;
        });
        
        

        this.position_name = '';
        if (this.DivRefId == 0) {
            this.selectedCreateDivition = {
                name: 'Please Select',
                org_name: '',
                id: 0,
                org_id: 0,
            };
        }
        this.selectedCreatePositionPARENT = { name: 'Please Select', id: 0 };
        this.selectedCreatePositionTypeMstLov = {
            name: 'Please Select',
            id: '0',
        };
        this.PositionStatusRadio = 'ACTIVE';
        this.PositionFlagRadio = 'INACTIVE';
        console.log(this.mylistdata);
    }

    createPosition(index: number) {
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
                let token = JSON.stringify(localStorage.getItem('sessionid'));
                token = JSON.parse(token);
                let tokendecode = jwt_decode<any>(token);
                let PositionType = this.selectedCreatePositionTypeMstLov;

                console.log(token);

                let body = {
                    org_id: this.selectedCreateDivition.org_id,
                    div_id: this.selectedCreateDivition.id,
                    position_name: this.position_name,
                    position_status: this.PositionStatusRadio,
                    approve_flag: this.PositionFlagRadio,
                    position_type: this.selectedCreatePositionTypeMstLov.name,
                    position_type_id: this.selectedCreatePositionTypeMstLov.id,
                    position_parent_id: this.selectedCreatePositionPARENT.id,
                    principalNAME: tokendecode.sub,
                    token: token,
                };

                console.log(body);

                for (let i = 0; i < this.mylistdata.length; i++) {
                    this.PositionServive.createPosition(this.mylistdata[i])
                        .toPromise()
                        .then((res: any) => {
                            console.log(res);

                            if (res.status == 'success') {
                                this.findPosition();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Confirmed',
                                    detail: 'Success',
                                });
                                this.loading[index] = false;
                                this.displayResponsiveCreatePosition = false;

                                this.DivRefId = 0;
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
                this.mylistdata.splice(0);
            },
        });
    }

    defaultFlag() {
        this.dropdownTypeItemsParent2 = [{ name: 'Please Select', id: 0 }];
        this.getDropdownCreatPositionParent(this.selectedCreateDivition.id);
    }

    defaultFlag2() {
        this.dropdownTypeItemsParent2 = [{ name: 'Please Select', id: 0 }];
        this.getDropdownCreatPositionParent(this.selectedEditDivition);

        console.log(this.dropdownTypeItemsParent2)
    }

    getDropdownCreatPositionParent(data: any) {
        let body = {
            div_id: Number(data),
        };
        this.PositionServive.dropdownPositionParent(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsParent2.push({
                        name: value.position_name,
                        id: value.position_id,
                    });
                });
            })
            .catch((err) => {});
    }

    linkback() {
        if (this.DivRefId > 0) {
            this.router.navigate(['/division/back']);
        } else {
            this.mylistdata.splice(0);
            this.displayResponsiveCreatePosition = false;
        }
    }
}
