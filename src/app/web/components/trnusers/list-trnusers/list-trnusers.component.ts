import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DropdownDivision } from 'src/app/web/api/dropdownDivition';
import { DropdownPosition } from 'src/app/web/api/dropdownPosition';
import { TranUser } from 'src/app/web/api/tranUser';
import {TransuserService} from "../../../service/transuser.service";

@Component({
  selector: 'app-list-trnusers',
  templateUrl: './list-trnusers.component.html',
  styleUrls: ['./list-trnusers.component.scss']
})
export class ListTrnusersComponent implements OnInit {


  constructor(private router: Router,private transuserService: TransuserService,) { }



  loading = [false, false]
  displayResponsiveCreateDivision  : boolean  = false;
  displayResponsiveEditDivision : boolean  = false;

  displayResponsiveSearchDivision : boolean  = false;

  transDropdownDivitionItems : DropdownDivision [] = [];
  transSelectedDivisionState : string = '';

  transDropdownPositionItems : DropdownPosition [] = [];
  transSelectedPositionState : string = '';

  transDropdownManagerItems : DropdownPosition [] = [];
  transSelectedManagerState : string = '';

  transStatusRadio : string = '';

  transUsername:string = '';

  
  paramSerachtranUser: TranUser = {} as TranUser;

  listTranUser:TranUser[] = [];

  selectedTranUser: TranUser[] = [];

  items!: MenuItem[];

  ngOnInit(): void {
    this.getTransUserList();


  }

  getTransUserList() {

        
    this.transuserService.findTranUser(this.paramSerachtranUser).toPromise().then((res: any) => {
        console.log(res.resultData);
        this.listTranUser = res.resultData;
        console.log('this.listTranUser');
        console.log(this.listTranUser);
    }).catch((err) => {
        console.log(err);
    });

}

  
  showResponsiveDialogCreateDivision() {
    this.displayResponsiveCreateDivision = true;
    console.log(1);
  }

  createDivision(index: number){

    this.loading[index] = true;

  }



  linkPageCreateTranUser(index: number){

     this.router.navigate(['/transuser/create']);
  }


  
  searchOrganization(index: number){

    this.loading[index] = true;

  }

  linkEditTranUser(id:number){
    this.router.navigate(['/transuser/edit',{ref: id}]);

  }

}
