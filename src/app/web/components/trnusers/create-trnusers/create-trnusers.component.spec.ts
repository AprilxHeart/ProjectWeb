import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrnusersComponent } from './create-trnusers.component';

describe('CreateTrnusersComponent', () => {
  let component: CreateTrnusersComponent;
  let fixture: ComponentFixture<CreateTrnusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrnusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrnusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
