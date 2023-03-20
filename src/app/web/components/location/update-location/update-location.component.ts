import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/web/service/location.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import { Utility } from 'src/app/web/utill/utility';
import { Location } from 'src/app/web/api/location';
import { EditLocation } from 'src/app/web/api/editLocation';
import jwt_decode from 'jwt-decode';
import { SESSION } from 'src/app/web/utill/constants';
import { MstLov } from 'src/app/web/api/mstlov';
import { DropdownAddress } from 'src/app/web/api/dropdownAddress';
import { DropdownProvince } from 'src/app/web/api/dropdownProvince';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class UpdateLocationComponent implements OnInit {

  constructor(private mstlovService: MstlovService,
    private locationService: LocationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private util: Utility,
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,) { }

    location!: EditLocation[];

    dropdownRegion: MstLov[] = ([] = []);
    selectedCreateRegion!: MstLov;
    selectedEditRegion: string = '';
    dropdownSubRegion: MstLov[] = [];
    selectedCreateSubRegion!: MstLov;
    selectedEditSubRegion: string = '';
    dropdownDitribution: MstLov[] = ([] = []);
    selectedCreateDitribution!: MstLov;
    selectedEditDitibution: string = '';
    dropdownCHN: MstLov[] = [];
    selectedCreateCHN!: MstLov;
    selectedEditCHN: string = '';
    dropdownShopTypeGroup: MstLov[] = [];
    selectedCreateShopTypeGroup!: MstLov;
    selectedEditShopTypeGroup: string = '';
    dropdownShopType: MstLov[] = [];
    selectedCreateShopType!: MstLov;
    selectedEditShopType: string = '';
    dropdownChannelType: MstLov[] = [];
    selectedCreateChannelType!: MstLov;
    selectedEditChannel: string = '';
    dropdownPayChannel: MstLov[] = [];
    selectedCreatePayChannel!: MstLov;
    selectedEditPayChannel: string = '';
    dropdownIdType: MstLov[] = [];
    selectedCreateIdType!: MstLov;
    selectedEditIdType: string = '';
    dropdownStatus = [
        { name: 'ACTIVE', id: '1' },
        { name: 'INACTIVE', id: '2' },
    ];
    dropdownGq = [
        { name: 'Y', id: '1' },
        { name: 'N', id: '2' },
    ];
    selectlocationStatus!: { name: 'ACTIVE'; id: '1' };

    selectedEditHgflag =  {name : '',id : ''};
    regionNameTh!: any;
    regionNameEn!: any;
    subregionNameTh!: any;
    subregionNameEn!: any;
    distributionName!: any;
    chn!: any;
    shoptypegroup!: any;
    shoptype!: any;
    locationcode!: string;
    idnumber!: string;
    locationNameTh!: string;
    locationNameEn!: any;
    businessname!: any;
    publicnameTh!: any;
    publicnameEn!: any;
    companyName!: any;
    effectiveEndDate!: any;
    effectiveStartDate!: any;

    isFormInvalid: boolean = false;
    locationcodeInvalid: boolean = false;
    locationNameThInvalid: boolean = false;
    regionInvalid: boolean = false;
    statusInvalid: boolean = false;
    idNumberInvalid: boolean = false;

    dropdownLocationAddressType: MstLov[] = [];
    selectLocationAddressType!: MstLov;
    selectLocationAddressTypeEdit: string = '';
    dropdownLocationContry: MstLov[] = [];
    selectLocationContry!: MstLov;
    selectLocationEdit: string = '';
    dropdownLocationContryEn: MstLov[] = [];
    selectLocationContryEn!: MstLov;
    selectLocationContryEnEdit: string = '';
    dropdownProvince: DropdownProvince[] = [];
    selectProvice!: DropdownProvince;
    selectProviceEdit: string = '';
    dropdownProvinceEn: DropdownProvince[] = [];
    selectProviceEn!: DropdownProvince;
    selectProviceEnEdit: string = '';
    dropdownAmphur: DropdownAddress[] = [];
    dropdownAmphurEn: DropdownAddress[] = [];
    selectAmphur!: DropdownAddress;
    selectAmphurEdit: string = '';
    selectAmphurEn!: DropdownAddress;
    selectAmphurEnEdit: string = '';
    dropdownTumbol: DropdownAddress[] = [];
    dropdownTumbolEn: DropdownAddress[] = [];
    selectTumbol!: DropdownAddress;
    selectTumbolEdit: string = '';
    selectTumbolEn!: DropdownAddress;
    selectTumbolEnEdit: string = '';
    dropdownZipCode: DropdownAddress[] = [];
    selectZipCode!: DropdownAddress;
    selectZipCodeEdit: string = '';

    locationaddressnameTh!: any;
    locationaddressnameEn!: any;
    locationSoiTh!: any;
    locationSoiEn!: any;
    locationMooTh!: any;
    locationMooEn!: any;
    locationMoobanTh!: any;
    locationMoobanEn!: any;
    locationbuildingnameTh!: any;
    locationbuildingnameEn!: any;
    locationStreetTh!: any;
    locationStreetEn!: any;
    locationFoolrTh!: any;
    locationFoolrEn!: any;
    locationRoomunitTh!: any;
    locationRoomunitEn!: any;
    locCode !: any;
    ref !: number
    items!: MenuItem[];
    ngOnInit(): void {

         this.route.params.subscribe(params => {
             if (params['ref']) {
                 (1)
                 this.ref = parseInt(params['ref']);
             }
         });
        this.findLocation(this.ref);
        this.getRegionMstLov();
        this.getPayChannelMstLov();
        this.getChannelTypeMstLov();
        this.getShopTypeMstLov();
        this.getShopTypeGroupMstLov();
        this.getCHNMstLov();
        this.getDistributionMstLov();

        this.getIdType();
        this.getAddressType();
        this.getCountry();
        this.getProvince();
        this.locationcodeInvalid = false;
        this.locationcode = '';
        this.idnumber = ''

        this.locationNameTh = '';
        this.locationNameThInvalid = false;
        this.dropdownProvinceEn = [
            {
                province_code: '',
                province_name_th: '',
                province_name_en: 'select',
            },
        ];
        this.dropdownProvince = [
            {
                province_code: '',
                province_name_th: 'select',
                province_name_en: '',
            },
        ];


        this.dropdownZipCode = [
            {
                amPhurTh: '',
                amPhurEn: '',
                tumBolTh: '',
                tumBolEn: '',
                zipCode: 'select',
            },
        ];



        this.dropdownSubRegion = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: '',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];


        this.dropdownShopTypeGroup = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
        this.dropdownShopType = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
        this.dropdownChannelType = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
        this.dropdownPayChannel = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
        this.dropdownLocationAddressType = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
        this.dropdownLocationContry = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: 'Select',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
    }
    findLocation(data : number) {
        let body = {locId : data};
        this.locationService
            .LocationById(body)
            .toPromise()
            .then((res: any) => {
                this.location = res.resultData;
                this.locationNameTh =this.location[0].locNameTh
                this.idnumber = this.location[0].idNumber
                console.log(this.location);
                this.locationcode = this.location[0].locCode
                this.locationNameEn =this.location[0].locNameEn
                this.regionNameTh = this.location[0].regionNameTh
                this.regionNameEn = this.location[0].regionNameEn
                this.dropdownSubRegion = [
                    {
                        lovId: '',
                        lovParentId: '',
                        lovType: '',
                        lovName:this.location[0].subRegionCode ,
                        lovDes1: '',
                        lovDes2: '',
                        lovDes3: '',
                        lovDes4: '',
                        lovDes5: '',
                        lovStatus: '',
                        priority: '',
                    },
                ];
                this.subregionNameTh =this.location[0].subRegionTh
                this.subregionNameEn =this.location[0].subRegionEn
                this.selectedEditHgflag =
                    { name: this.location[0].hqFlag , id: '' }
                this.distributionName = this.location[0].distributionName
                this.businessname = this.location[0].businessName
                this.publicnameTh=this.location[0].publicNameTh
                this.publicnameEn=this.location[0].publicNameEn
                this.companyName=this.location[0].companyName

                this.effectiveEndDate = this.datepipe.transform(this.location[0].effectiveEndDate, 'yyyy-MM-dd HH:mm');
                this.effectiveStartDate= this.datepipe.transform(this.location[0].effectiveStartDate, 'yyyy-MM-dd HH:mm');
                this.locationaddressnameTh=this.location[0].locAddressNameTh
                this.locationaddressnameEn=this.location[0].locAddressNameEn
                this.locationSoiTh=this.location[0].locSoiTh
                this.locationSoiEn=this.location[0].locSoiEn
                this.locationMooTh=this.location[0].locMooTh
                this.locationMooEn=this.location[0].locMooEn
                this.locationMoobanTh=this.location[0].locMoobanTh
                this.locationMoobanEn=this.location[0].locMoobanEn
                this.locationbuildingnameTh=this.location[0].locBuildingnameTh
                this.locationbuildingnameEn=this.location[0].locBuildingnameEn
                this.locationStreetTh=this.location[0].locStreetTh
                this.locationStreetEn=this.location[0].locStreetEn
                this.locationFoolrTh=this.location[0].locFloorTh
                this.locationFoolrEn=this.location[0].locFloorEn
                this.locationRoomunitTh=this.location[0].locRoomUnitTh
                this.locationRoomunitEn=this.location[0].locRoom_unitEn


            })
            .catch((err) => {});
    }

    getProvince() {
        let body = {};
        this.locationService
            .dropdownProvince(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownProvince.push({
                        province_code: value.province_code,
                        province_name_th: value.province_name_th,
                        province_name_en: value.province_name_en,
                    });
                    this.dropdownProvinceEn.push({
                        province_code: value.province_code,
                        province_name_th: value.province_name_th,
                        province_name_en: value.province_name_en,
                    });


                });
                this.selectProviceEdit = this.location[0].locProvinceTh
                this.selectProviceEnEdit = this.location[0].locProvince_En

                this.dropdownProvince.forEach((value:any,key:any)=>{

                    if(value.province_name_th == this.selectProviceEdit)
                    {
                        this.locCode = value.province_code

                        this.getAmphur(this.locCode)
                    }
                })


            })
            .catch((err) => {});
    }

    getPayChannelMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'PAY_CHANNEL' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownPayChannel.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditPayChannel = this.location[0].payChannel
                });
                console.log(this.dropdownPayChannel);
            })
            .catch((err) => {});
    }
    getAddressType() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'LOC_ADDRESS_TYPE' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownLocationAddressType.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectLocationAddressTypeEdit = this.location[0].locAddressType
                });
                console.log(this.dropdownLocationAddressType);
            })
            .catch((err) => {});
    }
    getCountry() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'LOC_COUNTRY_TH' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownLocationContry.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                });

                this.selectLocationEdit =this.location[0].locCountryTh
                this.selectLocationContryEnEdit =this.location[0].locCountryEn
                console.log("ssssssssssss")
                console.log( this.selectLocationEdit);
            })
            .catch((err) => {});
    }
    getIdType() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'COMPANY_ID_TYPE' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownIdType.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditIdType = this.location[0].idType
                });
                console.log(this.dropdownIdType);
            })
            .catch((err) => {});
    }
    getChannelTypeMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'CHANNEL_TYPE' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownChannelType.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditChannel = this.location[0].channelType

                });
                console.log(this.dropdownChannelType);
            })
            .catch((err) => {});
    }

    getShopTypeMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'SHOP_TYPE' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownShopType.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditShopType = this.location[0].shopTypeCode
                    this.shoptype =this.location[0].shopTypeName
                });
                console.log(this.dropdownShopType);
            })
            .catch((err) => {});
    }

    getShopTypeGroupMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'SHOP_TYPE_GROUP' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownShopTypeGroup.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditShopTypeGroup = this.location[0].shopTypeGroupCode
                    this.shoptypegroup = this.location[0].shopTypeGroupName
                });
                console.log(this.dropdownShopTypeGroup);
            })
            .catch((err) => {});
    }
    getCHNMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'CHN_SALES_CODE' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownCHN.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditCHN = this.location[0].chnSalesCode
                    console.log(this.location[0].chnSalesCode)
                    this.chn = this.location[0].chnSalesName
                });
                console.log(this.dropdownCHN);
            })
            .catch((err) => {});
    }

    getDistributionMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'DITRIBUTION_CODE' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownDitribution.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditDitibution = this.location[0].distributionCode

                });
                console.log(this.dropdownDitribution);
            })
            .catch((err) => {});
    }

    getRegionMstLov() {
        this.mstlovService
            .findMstLovByTypeName({ typename: 'REGION' })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownRegion.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });
                    this.selectedEditRegion = this.location[0].regionCode
                });
                console.log(this.dropdownRegion);
            })
            .catch((err) => {});
    }
    getSubRegionMstLov(data: any) {
        this.locationService
            .ddlSubRegion({ regionId: data })
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownSubRegion.push({
                        lovId: value.lovId,
                        lovParentId: value.lovParentId,
                        lovType: value.lovType,
                        lovName: value.lovName,
                        lovDes1: value.lovDes1,
                        lovDes2: value.lovDes2,
                        lovDes3: value.lovDes3,
                        lovDes4: value.lovDes4,
                        lovDes5: value.lovDes5,
                        lovStatus: value.lovStatus,
                        priority: value.priority,
                    });

                });
                console.log(this.dropdownSubRegion);
            })
            .catch((err) => {});
    }
    getAmphur(data: any) {
        let body = {
            Code: data,
        };
        if(this.selectAmphurEdit.length == 0)
                {
                    let Code;
                    let amphur;
                    Code = this.locCode
                    amphur = this.location[0].locAmphurTh

                    this.getTumbol(Code, amphur);
                    this.getZipcode(Code, amphur);
                }
        this.locationService
            .dropdownAmphur(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownAmphur.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: '',
                        tumBolEn: '',
                        zipCode: '',
                    });
                    this.dropdownAmphurEn.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: value.tumBolTh,
                        tumBolEn: value.tumBolEn,
                        zipCode: value.zipCode,
                    });
                });
                console.log("\\\\\\\\\\\\\\\\\\\\\\")
                console.log(this.dropdownAmphur)
                this.selectAmphurEdit = this.location[0].locAmphurTh
                this.selectAmphurEnEdit = this.location[0].locAmphurEn
            })
            .catch((err) => {});
    }
    getTumbol(data: any, amphur: any) {
        let body = {
            Code: data,
            amphur: amphur,
        };
        this.locationService
            .dropdownTumbol(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    console.log(res)
                    console.log("55555555555555");
                    this.dropdownTumbol.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: value.tumBolTh,
                        tumBolEn: value.tumBolEn,
                        zipCode: value.zipCode,
                    });
                    this.dropdownTumbolEn.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: value.tumBolTh,
                        tumBolEn: value.tumBolEn,
                        zipCode: value.zipCode,
                    });
                });
                this.selectTumbolEdit = this.location[0].locTumbolTh
                this.selectTumbolEnEdit = this.location[0].locTumbolEn
                console.log("55555555555555");
                console.log(this.dropdownTumbol);
            })
            .catch((err) => {});
    }
    getZipcode(data: any, amphur: any) {
        let body = {
            Code: data,
            amphur: amphur,
        };
        this.locationService
            .dropdownZipcode(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownZipCode.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: value.tumBolTh,
                        tumBolEn: value.tumBolEn,
                        zipCode: value.zipCode,
                    });
                });
                this.selectZipCodeEdit = this.location[0].locPostalCode

            })
            .catch((err) => {});
    }
    setRegion() {
        this.dropdownSubRegion = [
            {
                lovId: '',
                lovParentId: '',
                lovType: '',
                lovName: 'Select',
                lovDes1: '',
                lovDes2: '',
                lovDes3: '',
                lovDes4: '',
                lovDes5: '',
                lovStatus: '',
                priority: '',
            },
        ];
        if (this.dropdownRegion.length > 0) {

            this.dropdownRegion.forEach((value: any, key: any) => {
                if (this.selectedEditRegion == value.lovName) {

                    this.getSubRegionMstLov(value.lovId);
                    this.regionNameTh = value.lovDes1;
                    this.regionNameEn = value.lovDes2;
                }
            });
        }


    }

    setSubRegion() {
        console.log(this.selectedEditSubRegion);
        if (this.dropdownSubRegion.length > 0) {
            this.dropdownSubRegion.forEach((value: any, key: any) => {
                if (this.selectedEditSubRegion == value.lovName) {
                    this.subregionNameTh = value.lovDes1;
                    this.subregionNameEn = value.lovDes2;
                }
            });
        }
    }

    setDistribution() {
        console.log(this.selectedEditDitibution);
        if (this.dropdownDitribution.length > 0) {
            this.distributionName =''
            this.dropdownDitribution.forEach((value: any, key: any) => {
                if (this.selectedEditDitibution == value.lovName) {
                    this.distributionName = value.lovDes1;

                }
            });
        }


    }

    setChn() {
        if (this.dropdownCHN.length > 0) {
            this.dropdownCHN.forEach((value: any, key: any) => {
                if (this.selectedEditCHN == value.lovName) {
                    this.chn = value.lovDes1;
                }
            });
        }

        console.log(this.chn);
    }

    setShopTypeGrop() {
        if (this.dropdownShopTypeGroup.length > 0) {
            this.dropdownShopTypeGroup.forEach((value: any, key: any) => {
                if (this.selectedEditShopTypeGroup == value.lovName) {
                    this.shoptypegroup = value.lovDes1;
                }
            });
        }

        console.log(this.shoptypegroup);
    }

    setShopType() {
        if (this.dropdownShopType.length > 0) {
            this.dropdownShopType.forEach((value: any, key: any) => {
                if (this.selectedEditShopType== value.lovName) {
                    this.shoptype = value.lovDes1;
                }
            });
        }

        console.log(this.shoptype);
    }

    setAmphur(data: any) {

        this.dropdownProvince.forEach((value:any,key:any)=> {
            if(data == value.province_name_th)
            {
                this.dropdownProvinceEn = [
                    {
                        province_code: '',
                        province_name_th: '',
                        province_name_en: value.province_name_en,
                    },
                ];
                this.dropdownAmphur = [
                    {
                        amPhurTh: 'select',
                        amPhurEn: '',
                        tumBolTh: '',
                        tumBolEn: '',
                        zipCode: '',
                    },
                ];
                this.dropdownAmphurEn = [
                    {
                        amPhurTh: '',
                        amPhurEn: 'select',
                        tumBolTh: '',
                        tumBolEn: '',
                        zipCode: '',
                    },
                ];
                this.dropdownTumbolEn = [
                    {
                        amPhurTh: '',
                        amPhurEn: '',
                        tumBolTh: '',
                        tumBolEn: 'select',
                        zipCode: '',
                    },
                ];
                this.dropdownTumbol = [
                    {
                        amPhurTh: '',
                        amPhurEn: '',
                        tumBolTh: 'select',
                        tumBolEn: '',
                        zipCode: '',
                    },
                ];
                this.dropdownZipCode = [
                    {
                        amPhurTh: '',
                        amPhurEn: '',
                        tumBolTh: '',
                        tumBolEn: '',
                        zipCode: 'select',
                    },
                ];


                this.locCode = value.province_code;
                this.getAmphur(this.locCode);

            }
        })


    }
    setTumbol(data: any) {
        this.dropdownAmphurEn.forEach((value:any,key:any)=>{
            console.log(data)
            if(data == value.amPhurTh)
            {
                this.dropdownAmphurEn = [
                    {
                        amPhurTh: '',
                        amPhurEn: value.amPhurEn,
                        tumBolTh: '',
                        tumBolEn: '',
                        zipCode: '',
                    },
                ];
            }
        })


        let Code;
        let amphur;
        Code = this.locCode
        amphur = this.selectAmphurEdit
        console.log("////////////////")
        console.log(Code)
        console.log(amphur)
        this.getTumbol(Code, amphur);
        this.getZipcode(Code, amphur);
    }
    setTumbolEn(data : any) {
        console.log(data)
        this.dropdownTumbol.forEach((value:any,key:any)=>{
            console.log(data)
            if(data == value.tumBolTh)
            {
                this.dropdownTumbolEn = [
                    {
                        amPhurTh: '',
                        amPhurEn:'',
                        tumBolTh: '',
                        tumBolEn:value.tumBolEn,
                        zipCode: '',
                    },
                ];
            }
        })
    }

    linkBack() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigate(['/location']);
            },
        });
    }
    test() {
        console.log(this.selectLocationAddressType.lovName);
        console.log(this.locationaddressnameTh);
        console.log(this.locationaddressnameEn);
        console.log(this.locationSoiTh);
        console.log(this.locationSoiEn);
        console.log(this.locationMooTh);
        console.log(this.locationMooEn);
        console.log(this.locationMoobanTh);
        console.log(this.locationMoobanEn);
        console.log(this.locationbuildingnameEn);
        console.log(this.locationbuildingnameTh);
        console.log(this.locationStreetTh);
        console.log(this.locationStreetEn);
        console.log(this.locationFoolrTh);
        console.log(this.locationFoolrEn);
        console.log(this.locationRoomunitTh);
        console.log(this.locationRoomunitEn);
        console.log(this.selectTumbol.tumBolTh);
        console.log(this.selectTumbolEn.tumBolEn);
        console.log(this.selectAmphur.amPhurTh);
        console.log(this.selectAmphurEn.amPhurEn);
        console.log(this.selectProvice.province_name_th);
        console.log(this.selectProviceEn.province_name_en);
        console.log(this.selectLocationContry.lovName);
        console.log(this.selectLocationContryEn.lovDes1);
        console.log(this.selectZipCode.zipCode);
    }

    createLocation() {
        if (this.util.isEmpty(this.locationcode.trim())) {
            this.locationcodeInvalid = true;
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'กรุณากรอก Location Code',
            });
            return;
        }
        if(this.selectedEditIdType == 'บัตรประชาชน')
        {
            if(this.util.isEmpty(this.idnumber.trim()))
            {
                this.idNumberInvalid = true;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'กรุณากรอก Id Number',
                });
                return;
            }

        }
        console.log(this.locationcode.trim());

        if (this.util.isEmpty(this.locationNameTh.trim())) {
            this.locationNameThInvalid = true;
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'กรุณากรอก Location Name Th',
            });

            return;
        }

        if (this.util.isEmpty(this.selectlocationStatus)) {
            this.statusInvalid = true;
        }
        if (
            this.util.isEmpty(this.selectedEditRegion) ||
            this.selectedEditRegion == 'Select'
        ) {
            this.regionInvalid = true;
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'กรุณากรอก Region',
            });
            return;
        }

        if (this.isFormInvalid) {
            return;
        }
        this.effectiveStartDate = this.datepipe.transform(
            this.effectiveStartDate,
            'yyyy-MM-dd HH:mm'
        );
        this.effectiveEndDate = this.datepipe.transform(
            this.effectiveEndDate,
            'yyyy-MM-dd HH:mm'
        );


        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let token = JSON.stringify(
                    localStorage.getItem(SESSION.SESSION_ID)
                );
                token = JSON.parse(token);
                let tokendecode = jwt_decode<any>(token);

                let bodyList = {
                    locId : this.location[0].locId,
                    idType: this.selectedEditIdType,
                    idNumber: this.idnumber,
                    locCode: this.locationcode,
                    locNameTh: this.locationNameTh,
                    locNameEn: this.locationNameEn,
                    locStatus: this.selectlocationStatus.name,
                    regionCode: this.selectedEditRegion,
                    regionNameTh: this.regionNameTh,
                    regionNameEn: this.regionNameEn,
                    subRegionCode: this.selectedEditSubRegion,
                    subRegionTh: this.subregionNameTh,
                    subRegionEn: this.subregionNameEn,
                    distributionCode: this.selectedEditDitibution,
                    distributionName: this.distributionName,
                    hqFlag: this.selectedEditHgflag,
                    effectiveStartDate: this.effectiveStartDate,
                    effectiveEndDate: this.effectiveEndDate,
                    createdBy: tokendecode.sub,
                    chnSalesCode: this.selectedEditCHN,
                    chnSalesName: this.chn,
                    shopTypeGroupCode: this.selectedEditShopTypeGroup,
                    shopTypeGroupName: this.shoptypegroup,
                    shopTypeCode: this.selectedEditShopType,
                    shopTypeName: this.shoptype,
                    channelType: this.selectedEditChannel,
                    businessName: this.businessname,
                    publicNameTh: this.publicnameTh,
                    publicNameEn: this.publicnameEn,
                    companyName: this.companyName,
                    payChannel: this.selectedCreatePayChannel,

                    locAddressId : this.location[0].locAddressId,
                    locAddressType: this.selectLocationAddressTypeEdit,
                    locAddressNameTh: this.locationaddressnameTh,
                    locSoiTh: this.locationSoiTh,
                    locMooTh: this.locationMooTh,
                    locMoobanTh: this.locationMoobanTh,
                    locBuildingnameTh: this.locationbuildingnameTh,
                    locStreetTh: this.locationStreetTh,
                    locFloorTh: this.locationFoolrTh,
                    locRoomUnitTh: this.locationRoomunitTh,
                    locTumbolTh:this.selectTumbolEdit ,
                    locAmphurTh: this.selectAmphurEdit,
                    locProvinceTh: this.selectProviceEdit,
                    locCountryTh: this.selectLocationEdit,
                    locPostalCode:this.selectZipCodeEdit ,
                    locAddressNameEn:this.locationaddressnameEn ,
                    locSoiEn: this.locationSoiEn,
                    locMooEn: this.locationMooEn,
                    locMoobanEn: this.locationMoobanEn,
                    locBuildingnameEn: this.locationbuildingnameEn,
                    locStreetEn: this.locationStreetEn,
                    locFloorEn: this.locationFoolrEn,
                    locRoom_unitEn: this.locationRoomunitEn,
                    locTumbolEn: this.selectTumbolEnEdit,
                    locAmphurEn: this.selectAmphurEnEdit,
                    locProvince_En: this.selectProviceEnEdit,
                    locCountryEn: this.selectLocationContryEnEdit,

                };
                console.log(bodyList)
                this.locationService
                    .updateLocation(bodyList)
                    .toPromise()
                    .then((res: any) => {
                        console.log(res);
                        if (res.status == 'success') {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'Success',
                            });

                            this.router.navigate(['/location']);
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
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Fail.',
                            detail: 'Fail',
                        });
                    });
            },
            reject: () => {},
        });
    }

}
