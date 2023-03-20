import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApproveComponent } from './list-approve.component';

describe('ListApproveComponent', () => {
  let component: ListApproveComponent;
  let fixture: ComponentFixture<ListApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
