import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITurmaACC, TurmaACC } from 'app/shared/model/turma-acc.model';
import { TurmaACCService } from './turma-acc.service';
import { ICertificado } from 'app/shared/model/certificado.model';
import { CertificadoService } from 'app/entities/certificado/certificado.service';
import { ICurso } from 'app/shared/model/curso.model';
import { CursoService } from 'app/entities/curso/curso.service';

@Component({
  selector: 'jhi-turma-acc-update',
  templateUrl: './turma-acc-update.component.html'
})
export class TurmaACCUpdateComponent implements OnInit {
  isSaving: boolean;

  certificados: ICertificado[];

  cursos: ICurso[];
  inicioDp: any;
  prazoEnvioDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    pontuacao: [],
    inicio: [],
    prazoEnvio: [],
    certificados: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected turmaACCService: TurmaACCService,
    protected certificadoService: CertificadoService,
    protected cursoService: CursoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ turmaACC }) => {
      this.updateForm(turmaACC);
    });
    this.certificadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICertificado[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICertificado[]>) => response.body)
      )
      .subscribe((res: ICertificado[]) => (this.certificados = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cursoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICurso[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICurso[]>) => response.body)
      )
      .subscribe((res: ICurso[]) => (this.cursos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(turmaACC: ITurmaACC) {
    this.editForm.patchValue({
      id: turmaACC.id,
      nome: turmaACC.nome,
      pontuacao: turmaACC.pontuacao,
      inicio: turmaACC.inicio,
      prazoEnvio: turmaACC.prazoEnvio,
      certificados: turmaACC.certificados
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const turmaACC = this.createFromForm();
    if (turmaACC.id !== undefined) {
      this.subscribeToSaveResponse(this.turmaACCService.update(turmaACC));
    } else {
      this.subscribeToSaveResponse(this.turmaACCService.create(turmaACC));
    }
  }

  private createFromForm(): ITurmaACC {
    return {
      ...new TurmaACC(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      pontuacao: this.editForm.get(['pontuacao']).value,
      inicio: this.editForm.get(['inicio']).value,
      prazoEnvio: this.editForm.get(['prazoEnvio']).value,
      certificados: this.editForm.get(['certificados']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurmaACC>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCertificadoById(index: number, item: ICertificado) {
    return item.id;
  }

  trackCursoById(index: number, item: ICurso) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
