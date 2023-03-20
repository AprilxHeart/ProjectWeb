import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/web/service/location.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import { Utility } from 'src/app/web/utill/utility';
import { Location } from 'src/app/web/api/location';
import jwt_decode from 'jwt-decode';
import { SESSION } from 'src/app/web/utill/constants';
import { MstLov } from 'src/app/web/api/mstlov';
import { Router } from '@angular/router';
@Component({
    selector: 'app-list-location',
    templateUrl: './list-location.component.html',
    styleUrls: ['./list-location.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ListLocationComponent implements OnInit {
    constructor(
        private mstlovService: MstlovService,
        private locationService: LocationService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private util: Utility,
        private router: Router
    ) {}

    location!: Location[];


    ngOnInit(): void {

        this.findLocation();


    }
    findLocation() {
        let body = {};
        this.locationService
            .findLocation(body)
            .toPromise()
            .then((res: any) => {
                this.location = res.resultData;
                console.log(this.location);
            })
            .catch((err) => {});
    }

    linkcreateLocation() {
        this.router.navigate(['/location/create']);
    }

    linkupdateLocation(data : any) {
        console.log(data.locId)
        this.router.navigate(['/location/update',{ref: data.locId}]);
    }
    linkviewLocation(data : any) {
        console.log(data.locId)
        this.router.navigate(['/location/view',{ref: data.locId}]);
    }
}
