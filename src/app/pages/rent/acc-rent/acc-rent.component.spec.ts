import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccRentComponent } from './acc-rent.component';

describe('AccRentComponent', () => {
  let component: AccRentComponent;
  let fixture: ComponentFixture<AccRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
