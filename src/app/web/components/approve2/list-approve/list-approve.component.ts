import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/web/api/product';
import { ProductService } from 'src/app/web/service/product.service';
import { UserRoleService } from 'src/app/web/service/user-role.service';
import { ProjectService } from 'src/app/web/service/project.service';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import jwt_decode from 'jwt-decode';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Project } from 'src/app/web/api/Project';
import { UserRole } from 'src/app/web/api/userRole';
import { DropdownOrganization } from 'src/app/web/api/dropdownOrganization';
import { Utility } from 'src/app/web/utill/utility';
import { SESSION } from 'src/app/web/utill/constants';
import * as e from 'cors';
import { Dropdown } from 'src/app/web/api/Dropdown';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-list-approve',
    templateUrl: './list-approve.component.html',
    styleUrls: ['./list-approve.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ListApproveComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private userRoleService: UserRoleService,
        private projectService: ProjectService,
        private mstlovService: MstlovService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private util: Utility
    ) {}

    displayResponsiveCreateProfile: boolean = false;
    displayResponsiveApprove: boolean = false;
    loading = [false, false];
    btnEditIsdisable: boolean = false;
    EditIsdisable: boolean = true;
    items!: MenuItem[];
    mylistdata: any = [];

    dropdownTypeItemsStatus  : Dropdown[] = [];

    selectedEditStatus: string = '';

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
    
    projects!: Project[];
    selectedProjects: Project[] = [];
    project: Project = {} as Project;

    projectid :number = 0;
    projectname :string='';


    listProject:Project[] = [];
    selectedProject: Project[] = [];


    product!: Product;
    selectedProducts: Product[] = [];
    userRoleDialog: boolean = false;

    ngOnInit(): void {
        this.getProjectList();
        this.getMstProjectStatus();
        this.productService
            .getProducts()
            .then((data) => (this.products = data));

        this.selectedCreateProfileTypeMstLov = {
            name: 'Please Select',
            id: '',
        };
        this.btnEditIsdisable = false;
    }

    isFormInvalid: boolean = false;
    userNameInvalid: boolean = false;
    userRoletypeInvalid: boolean = false;


    showResponsiveDialogApprove(listProject: Project) {
        this.project = { ...listProject };
        this.projectid = this.project.project_id;
        this.projectname = this.project.project_name;
        this.selectedEditStatus = this.project.project_status;
        this.displayResponsiveApprove = true;
        this.btnEditIsdisable = false;
        this.isFormInvalid = false;
        this.userNameInvalid = false;
        this.userRoletypeInvalid = false;
        console.log("testna01"+this.selectedEditStatus);
    }




    hideDialog() {
        this.userRoleDialog = false;
        this.submitted = false;
    }

    getProjectList() {
        let token = JSON.stringify(
          localStorage.getItem(SESSION.SESSION_ID)
      );
      token = JSON.parse(token);
      let tokendecode = jwt_decode<any>(token);
        this.projectService.findapproveproject({ principalNAME: tokendecode.sub }).toPromise().then((res: any) => {
            console.log(res.resultData);
            this.listProject = res.resultData;
            console.log('this.projects');
            console.log(this.listProject);
        }).catch((err) => {
            console.log(err);
        });
    
    }

    getMstProjectStatus() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'PROJECT_STATUS' })
            .toPromise()
            .then((res: any) => {
                console.log(res.resultData);
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownTypeItemsStatus.push({
                        name: value.lovName,
                        id: value.lovId,
                    });
                });
            })
            .catch((err) => {});
    }

    ApproveProject(index: number) {
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
                        project_id : this.projectid,
                        project_status : this.selectedEditStatus,
                        principalNAME: tokendecode.sub,
                        token: token,
                    };

                    this.projectService
                        .approveproject(body)
                        .toPromise()
                        .then((res: any) => {
                            if (res.status == 'success') {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Confirmed',
                                    detail: 'Success',
                                });
                                this.loading[index] = false;
                                this.displayResponsiveApprove = false;
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





}
