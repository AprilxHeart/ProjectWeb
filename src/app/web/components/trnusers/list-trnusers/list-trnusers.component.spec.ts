import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrnusersComponent } from './list-trnusers.component';

describe('ListTrnusersComponent', () => {
  let component: ListTrnusersComponent;
  let fixture: ComponentFixture<ListTrnusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrnusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrnusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
