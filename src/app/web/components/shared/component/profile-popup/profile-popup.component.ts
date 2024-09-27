import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  @Input() userProfile: any = {}; // รับข้อมูลโปรไฟล์จาก parent component
  displayResponsiveProfileDetails: boolean = false;

  ngOnInit(): void {}

  showDialog() {
    this.displayResponsiveProfileDetails = true;
  }

  closeDialog() {
    this.displayResponsiveProfileDetails = false;
  }
}