import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './web/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './web/auth.guard';
import { UserNotfoundComponent } from './web/components/user-notfound/user-notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                //canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./web/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuard] },
                    { path: 'organization', loadChildren: () => import('./web/components/organization/organization.module').then(m => m.OrganizationModule),canActivate: [AuthGuard]  },
                    { path: 'division', loadChildren: () => import('./web/components/division/division.module').then(m => m.DivisionModule),canActivate: [AuthGuard]},
                    { path: 'position', loadChildren: () => import('./web/components/position/position.module').then(m => m.PositionModule) ,canActivate: [AuthGuard]},
                    { path: 'user-profile', loadChildren: () => import('./web/components/user-profile/user-profile.module').then(m => m.UserProfileModule) ,canActivate: [AuthGuard]},
                    { path: 'user-role-member', loadChildren: () => import('./web/components/user-role-member/user-role-member.module').then(m => m.UserRoleModule) ,canActivate: [AuthGuard]},
                    { path: 'transuser', loadChildren: () => import('./web/components/trnusers/trnusers.module').then(m => m.TrnusersModule) ,canActivate: [AuthGuard] },
                    { path: 'project', loadChildren: () => import('./web/components/project/project.module').then(m => m.ProjectModule) ,canActivate: [AuthGuard] },
                    { path: 'approvementtest', loadChildren: () => import('./web/components/approve/approve.module').then(m => m.ApproveModule) ,canActivate: [AuthGuard] },
                    { path: 'approvement', loadChildren: () => import('./web/components/approve2/approve.module').then(m => m.ApproveModule) ,canActivate: [AuthGuard] },
                    { path: 'uikit', loadChildren: () => import('./web/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'mstlov', loadChildren: () => import('./web/components/mstlov/mstlov.module').then(m => m.MstlovModule) ,canActivate: [AuthGuard]},
                    { path: 'location', loadChildren: () => import('./web/components/location/location.module').then(m => m.LocationModule) ,canActivate: [AuthGuard]},
                    { path: 'utilities', loadChildren: () => import('./web/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./web/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./web/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./web/components/pages/pages.module').then(m => m.PagesModule) },
                ],
            },
            //web
            //{ path: 'auth', loadChildren: () => import('./web/components/auth/auth.module').then(m => m.AuthModule) },
            //web
            { path: 'auth', loadChildren: () => import('./web/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'VOAuthen', loadChildren: () => import('./web/components/idssmal/idssaml-routing.module').then(m => m.IdssamlRoutingModule) },
            { path: 'landing', loadChildren: () => import('./web/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: 'usernotfound', component: UserNotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: false  })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
