import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePopupComponent } from './component/profile-popup/profile-popup.component';

@NgModule({
  declarations: [
    ProfilePopupComponent, // ประกาศคอมโพเนนต์นี้ในโมดูล
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ProfilePopupComponent, // ส่งออกคอมโพเนนต์นี้ให้ใช้ในโมดูลอื่นได้
  ],
})
export class SharedModule {}
