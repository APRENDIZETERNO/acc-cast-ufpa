import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoCertificado } from 'app/shared/model/tipo-certificado.model';

@Component({
  selector: 'jhi-tipo-certificado-detail',
  templateUrl: './tipo-certificado-detail.component.html'
})
export class TipoCertificadoDetailComponent implements OnInit {
  tipoCertificado: ITipoCertificado;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoCertificado }) => {
      this.tipoCertificado = tipoCertificado;
    });
  }

  previousState() {
    window.history.back();
  }
}
