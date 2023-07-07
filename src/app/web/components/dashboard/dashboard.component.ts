import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Project } from 'src/app/web/api/Project';
import { ProjectService } from "../../service/project.service";
import { SESSION, KEYFILLTER } from "../../utill/constants";
import jwt_decode from "jwt-decode";
import { Dropdown } from 'src/app/web/api/Dropdown';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    Myindex !:number;
    CountNumber !:number;
    CountNumber2 !:number;

    CountIntProejectApprove !:number;

    CountIntMyProject !:number;

    CountIntWaitApproveProject !:number;

    CountIntPeddingProject !:number;

    CountIntSuccessProject!:number;

    CountIntTodoProject !:number;

    listProject:Project[] = [];

    listProjectApprove:Project[] = [];

    Count: Dropdown[] = [];

    Count2: Dropdown[] = [];

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(
        private productService: ProductService, 
        private projectService: ProjectService,
        public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        this.getCountProject();
        this.getProjectList();
        this.getProjectListApprove();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    getCountProject() {
        let token = JSON.stringify(localStorage.getItem(SESSION.SESSION_ID));
        token = JSON.parse(token);
        let tokendecode = jwt_decode<any>(token);
        console.log(token);
        let body = {

            principalNAME: tokendecode.sub,
            token: token,
        };

        this.projectService
            .CountProejectApprove(body)
            .toPromise()
            .then((res: any) => {
                console.log('--CountProejectApprove--');
                    this.CountIntProejectApprove = res.resultData ;
                    console.log(this.CountIntProejectApprove);
            }
            
            )
            this.projectService
            .CountMyProject(body)
            .toPromise()
            .then((res: any) => {
                console.log('--CountMyProject--');
                    this.CountIntMyProject = res.resultData ;
            }
            
            )

            this.projectService
            .CountWaitApproveProject(body)
            .toPromise()
            .then((res: any) => {
                console.log('--CountWaitApproveProject--');
                    this.CountIntWaitApproveProject = res.resultData ;

            }
            
            )
            this.projectService
            .CountMyProject(body)
            .toPromise()
            .then((res: any) => {
                console.log('--CountMyProject--');
                    this.CountIntPeddingProject = res.resultData ;
            }
            
            )

            this.projectService
            .CountSuccessProject(body)
            .toPromise()
            .then((res: any) => {
                console.log('--CountSuccessProject--');
                    this.CountIntSuccessProject = res.resultData ;
            }
            
            )
            this.projectService
            .CountTodoProject(body)
            .toPromise()
            .then((res: any) => {
                console.log('--CountTodoProject--');
                    this.CountIntTodoProject = res.resultData ;
            }
            
            )


            .catch((err) => {});

    }

    getProjectList() {
        let token = JSON.stringify(
          localStorage.getItem(SESSION.SESSION_ID)
      );
      token = JSON.parse(token);
      let tokendecode = jwt_decode<any>(token);
        this.projectService.findmyproject({ principalNAME: tokendecode.sub }).toPromise().then((res: any) => {
            console.log(res.resultData);
            this.listProject = res.resultData;
            console.log('this.listProject');
            console.log(this.listProject);
        }).catch((err) => {
            console.log(err);
        });
    
    }

    getProjectListApprove() {
        let token = JSON.stringify(
          localStorage.getItem(SESSION.SESSION_ID)
      );
      token = JSON.parse(token);
      let tokendecode = jwt_decode<any>(token);
        this.projectService.approveprojectfullname({ principalNAME: tokendecode.sub }).toPromise().then((res: any) => {
            console.log(res.resultData);
            this.listProjectApprove = res.resultData;
            console.log('this.listProjectApprove');
            console.log(this.listProjectApprove);
        }).catch((err) => {
            console.log(err);
        });
    
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}


/* CountProejectApprove

CountMyProject

CountWaitApproveProject

CountPeddingProject

CountSuccessProject

CountTodoProject */