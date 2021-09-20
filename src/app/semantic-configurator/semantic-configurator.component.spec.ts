import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticConfiguratorComponent } from './semantic-configurator.component';

describe('SemanticConfiguratorComponent', () => {
  let component: SemanticConfiguratorComponent;
  let fixture: ComponentFixture<SemanticConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
