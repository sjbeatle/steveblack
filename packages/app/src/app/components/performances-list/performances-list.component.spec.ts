import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancesListComponent } from './performances-list.component';

describe('PerformancesComponent', () => {
  let component: PerformancesListComponent;
  let fixture: ComponentFixture<PerformancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
