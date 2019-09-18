import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICurso, Curso } from 'app/shared/model/curso.model';
import { CursoService } from './curso.service';
import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { TurmaACCService } from 'app/entities/turma-acc/turma-acc.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario/usuario.service';

@Component({
  selector: 'jhi-curso-update',
  templateUrl: './curso-update.component.html'
})
export class CursoUpdateComponent implements OnInit {
  isSaving: boolean;

  turmaaccs: ITurmaACC[];

  usuarios: IUsuario[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    sigla: [],
    turmasAccs: [],
    alunos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cursoService: CursoService,
    protected turmaACCService: TurmaACCService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ curso }) => {
      this.updateForm(curso);
    });
    this.turmaACCService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITurmaACC[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITurmaACC[]>) => response.body)
      )
      .subscribe((res: ITurmaACC[]) => (this.turmaaccs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.usuarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUsuario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUsuario[]>) => response.body)
      )
      .subscribe((res: IUsuario[]) => (this.usuarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(curso: ICurso) {
    this.editForm.patchValue({
      id: curso.id,
      nome: curso.nome,
      sigla: curso.sigla,
      turmasAccs: curso.turmasAccs,
      alunos: curso.alunos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const curso = this.createFromForm();
    if (curso.id !== undefined) {
      this.subscribeToSaveResponse(this.cursoService.update(curso));
    } else {
      this.subscribeToSaveResponse(this.cursoService.create(curso));
    }
  }

  private createFromForm(): ICurso {
    return {
      ...new Curso(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      sigla: this.editForm.get(['sigla']).value,
      turmasAccs: this.editForm.get(['turmasAccs']).value,
      alunos: this.editForm.get(['alunos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurso>>) {
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

  trackTurmaACCById(index: number, item: ITurmaACC) {
    return item.id;
  }

  trackUsuarioById(index: number, item: IUsuario) {
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
