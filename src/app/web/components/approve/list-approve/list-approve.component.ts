import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Project } from 'src/app/web/api/Project';
import {ProjectService} from "../../../service/project.service";
import { SESSION, KEYFILLTER } from "../../../utill/constants";
import jwt_decode from "jwt-decode";
import { MstlovService } from "../../../service/mstlov.service";
import { Dropdown } from 'src/app/web/api/Dropdown';
@Component({
  selector: 'app-list-approve',
  templateUrl: './list-approve.component.html',
  styleUrls: ['./list-approve.component.scss']
})
export class ListApproveComponent implements OnInit {

  dropdownTypeItemsStatus: Dropdown[] = [];

  constructor(private router: Router,private projectService: ProjectService,private mstlovService: MstlovService) {

  
   }

  loading = [false, false]

  paramSerachProject: Project = {} as Project;

  listProject:Project[] = [];

  selectedProject: Project[] = [];

  items!: MenuItem[];
  displayResponsiveEditProfile : boolean = false;
  btnEditIsdisable : boolean = false;

  ngOnInit(): void {
    this.getProjectList();

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
        console.log('this.listProject');
        console.log(this.listProject);
    }).catch((err) => {
        console.log(err);
    });

}

getMstLovProjectStatus() {
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


}
