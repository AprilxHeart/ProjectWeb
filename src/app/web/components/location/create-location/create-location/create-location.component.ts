import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/web/service/location.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService , MenuItem} from 'primeng/api';
import { MstlovService } from 'src/app/web/service/mstlov.service';
import { Utility } from 'src/app/web/utill/utility';
import { Location } from 'src/app/web/api/location';
import jwt_decode from 'jwt-decode';
import { SESSION } from 'src/app/web/utill/constants';
import { MstLov } from 'src/app/web/api/mstlov';
import { DropdownAddress } from 'src/app/web/api/dropdownAddress';
import { DropdownProvince } from 'src/app/web/api/dropdownProvince';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-create-location',
    templateUrl: './create-location.component.html',
    styleUrls: ['./create-location.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe],
})
export class CreateLocationComponent implements OnInit {
    constructor(
        private mstlovService: MstlovService,
        private locationService: LocationService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private util: Utility,
        public datepipe: DatePipe,
        private router: Router
    ) {}

    location!: Location[];
    items!: MenuItem[];
    dropdownRegion: MstLov[] = ([] = []);
    selectedCreateRegion!: MstLov;
    dropdownSubRegion: MstLov[] = [];
    selectedCreateSubRegion!: MstLov;
    dropdownDitribution: MstLov[] = ([] = []);
    selectedCreateDitribution!: MstLov;
    dropdownCHN: MstLov[] = [];
    selectedCreateCHN!: MstLov;
    dropdownShopTypeGroup: MstLov[] = [];
    selectedCreateShopTypeGroup!: MstLov;
    dropdownShopType: MstLov[] = [];
    selectedCreateShopType!: MstLov;
    dropdownChannelType: MstLov[] = [];
    selectedCreateChannelType!: MstLov;
    dropdownPayChannel: MstLov[] = [];
    selectedCreatePayChannel!: MstLov;
    dropdownIdType: MstLov[] = [];
    selectedCreateIdType!: MstLov;
    dropdownStatus = [
        { name: 'ACTIVE', id: '1' },
        { name: 'INACTIVE', id: '2' },
    ];
    dropdownGq = [
        { name: 'Y', id: '1' },
        { name: 'N', id: '2' },
    ];
    selectlocationStatus!: { name: 'ACTIVE'; id: '1' };
    selectlocationHgflag!: { name: 'Y'; id: '1' };

    regionNameTh!: any;
    regionNameEn!: any;
    subregionNameTh!: any;
    subregionNameEn!: any;
    distributionName!: any;
    chn!: any;
    shoptypegroup!: any;
    shoptype!: any;
    locationcode!: string;
    idnumber: any;
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
    dropdownLocationContry: MstLov[] = [];
    selectLocationContry!: MstLov;
    dropdownLocationContryEn: MstLov[] = [];
    selectLocationContryEn!: MstLov;
    dropdownProvince: DropdownProvince[] = [];
    selectProvice!: DropdownProvince;
    dropdownProvinceEn: DropdownProvince[] = [];
    selectProviceEn!: DropdownProvince;
    dropdownAmphur: DropdownAddress[] = [];
    dropdownAmphurEn: DropdownAddress[] = [];
    selectAmphur!: DropdownAddress;
    selectAmphurEn!: DropdownAddress;
    dropdownTumbol: DropdownAddress[] = [];
    dropdownTumbolEn: DropdownAddress[] = [];
    selectTumbol!: DropdownAddress;
    selectTumbolEn!: DropdownAddress;
    dropdownZipCode: DropdownAddress[] = [];
    selectZipCode!: DropdownAddress;

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
    ngOnInit(): void {
        this.getRegionMstLov();
        this.getPayChannelMstLov();
        this.getChannelTypeMstLov();
        this.getShopTypeMstLov();
        this.getShopTypeGroupMstLov();
        this.getCHNMstLov();
        this.getDistributionMstLov();
        this.findLocation();
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
        this.dropdownTumbol = [
            {
                amPhurTh: '',
                amPhurEn: '',
                tumBolTh: 'select',
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
        this.dropdownZipCode = [
            {
                amPhurTh: '',
                amPhurEn: '',
                tumBolTh: '',
                tumBolEn: '',
                zipCode: 'select',
            },
        ];
        this.dropdownIdType = [
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
        this.dropdownRegion = [
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
        this.dropdownDitribution = [
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
        this.dropdownCHN = [
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
                });
                console.log(this.dropdownProvince);
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
                console.log(this.dropdownLocationContry);
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
        this.locationService
            .dropdownAmphur(body)
            .toPromise()
            .then((res: any) => {
                res.resultData.forEach((value: any, key: string) => {
                    this.dropdownAmphur.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: value.tumBolTh,
                        tumBolEn: value.tumBolEn,
                        zipCode: value.zipCode,
                    });
                });
                console.log(this.dropdownAmphur);
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
                    this.dropdownTumbol.push({
                        amPhurTh: value.amPhurTh,
                        amPhurEn: value.amPhurEn,
                        tumBolTh: value.tumBolTh,
                        tumBolEn: value.tumBolEn,
                        zipCode: value.zipCode,
                    });
                });
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
                console.log(this.dropdownZipCode);
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
                if (this.selectedCreateRegion.lovName == value.lovName) {
                    this.getSubRegionMstLov(value.lovId);
                    this.regionNameTh = value.lovDes1;
                    this.regionNameEn = value.lovDes2;
                }
            });
        }

        console.log(this.regionNameTh);
    }

    setSubRegion() {
        console.log(this.selectedCreateSubRegion);
        if (this.dropdownSubRegion.length > 0) {
            this.dropdownSubRegion.forEach((value: any, key: any) => {
                if (this.selectedCreateSubRegion.lovName == value.lovName) {
                    this.subregionNameTh = value.lovDes1;
                    this.subregionNameEn = value.lovDes2;
                }
            });
        }
    }

    setDistribution() {
        console.log(this.selectedCreateDitribution);
        if (this.dropdownDitribution.length > 0) {
            this.dropdownDitribution.forEach((value: any, key: any) => {
                if (this.selectedCreateDitribution.lovName == value.lovName) {
                    this.distributionName = value.lovDes1;
                }
            });
        }

        console.log(this.distributionName);
    }

    setChn() {
        if (this.dropdownCHN.length > 0) {
            this.dropdownCHN.forEach((value: any, key: any) => {
                if (this.selectedCreateCHN.lovName == value.lovName) {
                    this.chn = value.lovDes1;
                }
            });
        }

        console.log(this.chn);
    }

    setShopTypeGrop() {
        if (this.dropdownShopTypeGroup.length > 0) {
            this.dropdownShopTypeGroup.forEach((value: any, key: any) => {
                if (this.selectedCreateShopTypeGroup.lovName == value.lovName) {
                    this.shoptypegroup = value.lovDes1;
                }
            });
        }

        console.log(this.shoptypegroup);
    }

    setShopType() {
        if (this.dropdownShopType.length > 0) {
            this.dropdownShopType.forEach((value: any, key: any) => {
                if (this.selectedCreateShopType.lovName == value.lovName) {
                    this.shoptype = value.lovDes1;
                }
            });
        }

        console.log(this.shoptype);
    }

    setAmphur(data: any) {
        this.dropdownProvinceEn = [
            {
                province_code: '',
                province_name_th: '',
                province_name_en: this.selectProvice.province_name_en,
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
        let Code;
        Code = this.selectProvice.province_code;
        this.getAmphur(Code);
    }
    setTumbol(data: any) {
        this.dropdownAmphurEn = [
            {
                amPhurTh: '',
                amPhurEn: this.selectAmphur.amPhurEn,
                tumBolTh: '',
                tumBolEn: '',
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
        let Code;
        let amphur;
        Code = this.selectProvice.province_code;
        amphur = this.selectAmphur.amPhurTh;
        this.getTumbol(Code, amphur);
        this.getZipcode(Code, amphur);
    }
    setTumbolEn() {
        this.dropdownTumbolEn = [
            {
                amPhurTh: '',
                amPhurEn: '',
                tumBolTh: '',
                tumBolEn: this.selectTumbol.tumBolEn,
                zipCode: '',
            },
        ];
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
        if(this.selectedCreateIdType.lovName == 'บัตรประชาชน')
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
            this.util.isEmpty(this.selectedCreateRegion.lovType) ||
            this.selectedCreateRegion.lovName == 'Select'
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
        // console.log(this.locationcode);
        // console.log(this.selectedCreateIdType.lovName);
        // console.log(this.idnumber);
        // console.log(this.locationNameTh);
        // console.log(this.locationNameEn);
        // console.log(this.selectlocationStatus.name);
        // console.log(this.selectedCreateRegion.lovName);
        // console.log(this.regionNameTh);
        // console.log(this.regionNameEn);
        // console.log(this.selectedCreateSubRegion.lovName);
        // console.log(this.subregionNameTh);
        // console.log(this.subregionNameEn);
        // console.log(this.selectedCreateDitribution.lovName);
        // console.log(this.distributionName);
        // console.log(this.selectlocationHgflag.name);
        // console.log(this.selectedCreateCHN.lovName);
        // console.log(this.chn);
        // console.log(this.selectedCreateShopTypeGroup.lovName);
        // console.log(this.shoptypegroup);
        // console.log(this.selectedCreateShopType.lovName);
        // console.log(this.shoptype);
        // console.log(this.businessname);
        // console.log(this.selectedCreateChannelType.lovName);
        // console.log(this.publicnameTh);
        // console.log(this.publicnameEn);
        // console.log(this.companyName);
        // console.log(this.selectedCreatePayChannel.lovName);
        // console.log(this.effectiveStartDate);
        // console.log(this.effectiveEndDate);

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
                    idType: this.selectedCreateIdType.lovName,
                    idNumber: this.idnumber,
                    locCode: this.locationcode,
                    locNameTh: this.locationNameTh,
                    locNameEn: this.locationNameEn,
                    locStatus: this.selectlocationStatus.name,
                    regionCode: this.selectedCreateRegion.lovName,
                    regionNameTh: this.regionNameTh,
                    regionNameEn: this.regionNameEn,
                    subRegionCode: this.selectedCreateSubRegion.lovName,
                    subRegionTh: this.subregionNameTh,
                    subRegionEn: this.subregionNameEn,
                    distributionCode: this.selectedCreateDitribution.lovName,
                    distributionName: this.distributionName,
                    hqFlag: this.selectlocationHgflag.name,
                    effectiveStartDate: this.effectiveStartDate,
                    effectiveEndDate: this.effectiveEndDate,
                    createdBy: tokendecode.sub,
                    chnSalesCode: this.selectedCreateCHN.lovName,
                    chnSalesName: this.chn,
                    shopTypeGroupCode: this.selectedCreateShopTypeGroup.lovName,
                    shopTypeGroupName: this.shoptypegroup,
                    shopTypeCode: this.selectedCreateShopType.lovName,
                    shopTypeName: this.shoptype,
                    channelType: this.selectedCreateChannelType.lovName,
                    businessName: this.businessname,
                    publicNameTh: this.publicnameTh,
                    publicNameEn: this.publicnameEn,
                    companyName: this.companyName,
                    payChannel: this.selectedCreatePayChannel.lovName,

                    locAddressType: this.selectLocationAddressType.lovName,
                    locAddressNameTh: this.locationaddressnameTh,
                    locSoiTh: this.locationSoiTh,
                    locMooTh: this.locationMooTh,
                    locMoobanTh: this.locationMoobanTh,
                    locBuildingnameTh: this.locationbuildingnameTh,
                    locStreetTh: this.locationStreetTh,
                    locFloorTh: this.locationFoolrTh,
                    locRoomUnitTh: this.locationRoomunitTh,
                    locTumbolTh:this.selectTumbol.tumBolTh ,
                    locAmphurTh: this.selectAmphur.amPhurTh,
                    locProvinceTh: this.selectProvice.province_name_th,
                    locCountryTh: this.selectLocationContry.lovName,
                    locPostalCode:this.selectZipCode.zipCode ,
                    locAddressNameEn:this.locationaddressnameEn ,
                    locSoiEn: this.locationSoiEn,
                    locMooEn: this.locationMooEn,
                    locMoobanEn: this.locationMoobanEn,
                    locBuildingnameEn: this.locationbuildingnameEn,
                    locStreetEn: this.locationStreetEn,
                    locFloorEn: this.locationFoolrEn,
                    locRoom_unitEn: this.locationRoomunitEn,
                    locTumbolEn: this.selectTumbolEn.tumBolEn,
                    locAmphurEn: this.selectAmphurEn.amPhurEn,
                    locProvince_En: this.selectProviceEn.province_name_en,
                    locCountryEn: this.selectLocationContryEn.lovDes1,

                };
                console.log(bodyList)
                this.locationService
                    .createLocation(bodyList)
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
