import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Project } from 'src/app/web/api/Project';
import {ProjectService} from "../../../service/project.service";
import { SESSION, KEYFILLTER } from "../../../utill/constants";
import jwt_decode from "jwt-decode";
import { Dropdown } from 'src/app/web/api/Dropdown';
@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {


  constructor(private router: Router,private projectService: ProjectService,) { }

  loading = [false, false]

  paramSerachProject: Project = {} as Project;

  listProject:Project[] = [];

  selectedProject: Project[] = [];
  displayResponsiveEditProfile: boolean = false;
  btnEditIsdisable: boolean = false;
  dropdownTypeItemsYear: Dropdown[] = [];
  items!: MenuItem[];

  ngOnInit(): void {
    this.getProjectList();

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

  linkPageCreateProject(index: number){

     this.router.navigate(['/project/create']);
  }

  linkEditProject(id:number){
    this.router.navigate(['/project/edit',{ref: id}]);

  }

}
