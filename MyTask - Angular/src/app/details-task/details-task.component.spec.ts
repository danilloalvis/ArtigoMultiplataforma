import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTaskComponent } from './details-task.component';

describe('DetailsTaskComponent', () => {
  let component: DetailsTaskComponent;
  let fixture: ComponentFixture<DetailsTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
