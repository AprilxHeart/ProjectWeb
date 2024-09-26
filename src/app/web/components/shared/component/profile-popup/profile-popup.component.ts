import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  displayResponsiveCreateProfile: boolean = false;
  userName: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  mobile: string = '';
  startDate: string = '';
  endDate: string = '';
  profileStatusRadio: string = 'ACTIVE';
  
  // Validation flags
  isFormInvalid: boolean = false;
  userNameInvalid: boolean = false;
  userprofiletypeInvalid: boolean = false;

  selectedCreateProfileTypeMstLov: any = {
    name: 'Please Select',
    id: '',
  };

  profileTypeOptions: any[] = [
    { name: 'Admin', id: 1 },
    { name: 'User', id: 2 },
    { name: 'Guest', id: 3 },
  ];

  ngOnInit(): void {
    // Initialization logic if needed
  }

  showDialog() {
    this.displayResponsiveCreateProfile = true;
    this.resetForm();
  }

  resetForm() {
    this.userName = '';
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.mobile = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedCreateProfileTypeMstLov = {
      name: 'Please Select',
      id: '',
    };
    this.profileStatusRadio = 'ACTIVE';
    this.isFormInvalid = false;
    this.userNameInvalid = false;
    this.userprofiletypeInvalid = false;
  }

  saveProfile() {
    // Validation logic
    this.userNameInvalid = !this.userName;
    this.userprofiletypeInvalid = !this.selectedCreateProfileTypeMstLov.id;

    // If any validation fails, don't proceed
    if (this.userNameInvalid || this.userprofiletypeInvalid) {
      this.isFormInvalid = true;
      return;
    }

    // Process the form data (save or send to backend)
    console.log('Saving profile...', {
      userName: this.userName,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      mobile: this.mobile,
      startDate: this.startDate,
      endDate: this.endDate,
      profileStatus: this.profileStatusRadio,
      profileType: this.selectedCreateProfileTypeMstLov,
    });

    // Close dialog after saving
    this.displayResponsiveCreateProfile = false;
  }
}
