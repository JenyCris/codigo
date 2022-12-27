import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoSueloComponent } from './certificado-suelo.component';

describe('CertificadoSueloComponent', () => {
  let component: CertificadoSueloComponent;
  let fixture: ComponentFixture<CertificadoSueloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoSueloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoSueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
