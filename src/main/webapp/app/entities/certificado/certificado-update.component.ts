import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ICertificado, Certificado } from 'app/shared/model/certificado.model';
import { CertificadoService } from './certificado.service';

@Component({
  selector: 'jhi-certificado-update',
  templateUrl: './certificado-update.component.html'
})
export class CertificadoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    titulo: [],
    descricao: [],
    dataEnvio: [],
    motivoPendente: [],
    motivoRejeitado: [],
    motivoParcial: [],
    tipo: [],
    chPedida: [],
    chConcedida: [],
    estado: [],
    caminhoArquivo: []
  });

  constructor(protected certificadoService: CertificadoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ certificado }) => {
      this.updateForm(certificado);
    });
  }

  updateForm(certificado: ICertificado) {
    this.editForm.patchValue({
      id: certificado.id,
      titulo: certificado.titulo,
      descricao: certificado.descricao,
      dataEnvio: certificado.dataEnvio != null ? certificado.dataEnvio.format(DATE_TIME_FORMAT) : null,
      motivoPendente: certificado.motivoPendente,
      motivoRejeitado: certificado.motivoRejeitado,
      motivoParcial: certificado.motivoParcial,
      tipo: certificado.tipo,
      chPedida: certificado.chPedida,
      chConcedida: certificado.chConcedida,
      estado: certificado.estado,
      caminhoArquivo: certificado.caminhoArquivo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const certificado = this.createFromForm();
    if (certificado.id !== undefined) {
      this.subscribeToSaveResponse(this.certificadoService.update(certificado));
    } else {
      this.subscribeToSaveResponse(this.certificadoService.create(certificado));
    }
  }

  private createFromForm(): ICertificado {
    return {
      ...new Certificado(),
      id: this.editForm.get(['id']).value,
      titulo: this.editForm.get(['titulo']).value,
      descricao: this.editForm.get(['descricao']).value,
      dataEnvio:
        this.editForm.get(['dataEnvio']).value != null ? moment(this.editForm.get(['dataEnvio']).value, DATE_TIME_FORMAT) : undefined,
      motivoPendente: this.editForm.get(['motivoPendente']).value,
      motivoRejeitado: this.editForm.get(['motivoRejeitado']).value,
      motivoParcial: this.editForm.get(['motivoParcial']).value,
      tipo: this.editForm.get(['tipo']).value,
      chPedida: this.editForm.get(['chPedida']).value,
      chConcedida: this.editForm.get(['chConcedida']).value,
      estado: this.editForm.get(['estado']).value,
      caminhoArquivo: this.editForm.get(['caminhoArquivo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICertificado>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
