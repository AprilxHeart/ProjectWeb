import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrnusersComponent } from './edit-trnusers.component';

describe('EditTrnusersComponent', () => {
  let component: EditTrnusersComponent;
  let fixture: ComponentFixture<EditTrnusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrnusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrnusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
