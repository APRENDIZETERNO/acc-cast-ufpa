import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { ICertificado } from 'app/shared/model/certificado.model';
import { CertificadoService } from 'app/entities/certificado/certificado.service';
import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { TurmaACCService } from 'app/entities/turma-acc/turma-acc.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving: boolean;

  certificados: ICertificado[];

  turmaaccs: ITurmaACC[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    login: [],
    senha: [],
    dataCadastro: [],
    ultimoLogin: [],
    perfil: [],
    certificados: [],
    turmasResponsavel: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected usuarioService: UsuarioService,
    protected certificadoService: CertificadoService,
    protected turmaACCService: TurmaACCService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);
    });
    this.certificadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICertificado[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICertificado[]>) => response.body)
      )
      .subscribe((res: ICertificado[]) => (this.certificados = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.turmaACCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITurmaACC[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITurmaACC[]>) => response.body)
      )
      .subscribe((res: ITurmaACC[]) => (this.turmaaccs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(usuario: IUsuario) {
    this.editForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      dataCadastro: usuario.dataCadastro != null ? usuario.dataCadastro.format(DATE_TIME_FORMAT) : null,
      ultimoLogin: usuario.ultimoLogin != null ? usuario.ultimoLogin.format(DATE_TIME_FORMAT) : null,
      perfil: usuario.perfil,
      certificados: usuario.certificados,
      turmasResponsavel: usuario.turmasResponsavel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  private createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      login: this.editForm.get(['login']).value,
      senha: this.editForm.get(['senha']).value,
      dataCadastro:
        this.editForm.get(['dataCadastro']).value != null ? moment(this.editForm.get(['dataCadastro']).value, DATE_TIME_FORMAT) : undefined,
      ultimoLogin:
        this.editForm.get(['ultimoLogin']).value != null ? moment(this.editForm.get(['ultimoLogin']).value, DATE_TIME_FORMAT) : undefined,
      perfil: this.editForm.get(['perfil']).value,
      certificados: this.editForm.get(['certificados']).value,
      turmasResponsavel: this.editForm.get(['turmasResponsavel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
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

  trackTurmaACCById(index: number, item: ITurmaACC) {
    return item.id;
  }
}
