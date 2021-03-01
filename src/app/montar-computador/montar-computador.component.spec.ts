import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontarComputadorComponent } from './montar-computador.component';

describe('MontarComputadorComponent', () => {
  let component: MontarComputadorComponent;
  let fixture: ComponentFixture<MontarComputadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontarComputadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontarComputadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
