import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoNomenclaturaComponent } from './certificado-nomenclatura.component';

describe('CertificadoNomenclaturaComponent', () => {
  let component: CertificadoNomenclaturaComponent;
  let fixture: ComponentFixture<CertificadoNomenclaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoNomenclaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoNomenclaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
