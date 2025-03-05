import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingFormComponent } from './housing-form.component';

describe('HousingFormComponent', () => {
  let component: HousingFormComponent;
  let fixture: ComponentFixture<HousingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
