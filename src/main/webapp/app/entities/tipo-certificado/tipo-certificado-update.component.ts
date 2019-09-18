import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoCertificado, TipoCertificado } from 'app/shared/model/tipo-certificado.model';
import { TipoCertificadoService } from './tipo-certificado.service';

@Component({
  selector: 'jhi-tipo-certificado-update',
  templateUrl: './tipo-certificado-update.component.html'
})
export class TipoCertificadoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: []
  });

  constructor(
    protected tipoCertificadoService: TipoCertificadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoCertificado }) => {
      this.updateForm(tipoCertificado);
    });
  }

  updateForm(tipoCertificado: ITipoCertificado) {
    this.editForm.patchValue({
      id: tipoCertificado.id,
      nome: tipoCertificado.nome
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoCertificado = this.createFromForm();
    if (tipoCertificado.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoCertificadoService.update(tipoCertificado));
    } else {
      this.subscribeToSaveResponse(this.tipoCertificadoService.create(tipoCertificado));
    }
  }

  private createFromForm(): ITipoCertificado {
    return {
      ...new TipoCertificado(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoCertificado>>) {
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
