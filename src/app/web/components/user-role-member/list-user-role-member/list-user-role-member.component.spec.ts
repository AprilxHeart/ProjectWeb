import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserRoleComponent } from './list-user-role-member.component';

describe('ListUserRoleComponent', () => {
  let component: ListUserRoleComponent;
  let fixture: ComponentFixture<ListUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
