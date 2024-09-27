import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePopupComponent } from './component/profile-popup/profile-popup.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    ProfilePopupComponent, // ประกาศคอมโพเนนต์นี้ในโมดูล
  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [
    ProfilePopupComponent, // ส่งออกคอมโพเนนต์นี้ให้ใช้ในโมดูลอื่นได้
  ],
})
export class SharedModule {}
