import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMstlovComponent } from './list-mstlov.component';

describe('ListMstlovComponent', () => {
  let component: ListMstlovComponent;
  let fixture: ComponentFixture<ListMstlovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMstlovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMstlovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
