import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICertificado } from 'app/shared/model/certificado.model';

@Component({
  selector: 'jhi-certificado-detail',
  templateUrl: './certificado-detail.component.html'
})
export class CertificadoDetailComponent implements OnInit {
  certificado: ICertificado;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ certificado }) => {
      this.certificado = certificado;
    });
  }

  previousState() {
    window.history.back();
  }
}
