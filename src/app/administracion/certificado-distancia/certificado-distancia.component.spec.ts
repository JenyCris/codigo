import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoDistanciaComponent } from './certificado-distancia.component';

describe('CertificadoDistanciaComponent', () => {
  let component: CertificadoDistanciaComponent;
  let fixture: ComponentFixture<CertificadoDistanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoDistanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoDistanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
