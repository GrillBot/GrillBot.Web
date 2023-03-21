import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';
import { UserDetailGuildsComponent } from './detail/user-detail-guilds/user-detail-guilds.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'me', pathMatch: 'full' },
    { path: 'me', component: UserDetailComponent }
];

@NgModule({
    declarations: [
        UserDetailComponent,
        UserDetailGuildsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }
