import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPropertiesComponent } from './sold-properties.component';

describe('SoldPropertiesComponent', () => {
  let component: SoldPropertiesComponent;
  let fixture: ComponentFixture<SoldPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
