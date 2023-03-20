import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrnusersComponent } from './view-trnusers.component';

describe('ViewTrnusersComponent', () => {
  let component: ViewTrnusersComponent;
  let fixture: ComponentFixture<ViewTrnusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrnusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrnusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
