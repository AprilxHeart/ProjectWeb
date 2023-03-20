import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './web/components/notfound/notfound.component';
import { ProductService } from './web/service/product.service';
import { CountryService } from './web/service/country.service';
import { CustomerService } from './web/service/customer.service';
import { EventService } from './web/service/event.service';
import { IconService } from './web/service/icon.service';
import { NodeService } from './web/service/node.service';
import { PhotoService } from './web/service/photo.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';




@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
    ],
    providers: [
        //{ provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, 
        CustomerService, 
        EventService, 
        IconService,
        NodeService,
        PhotoService, 
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
