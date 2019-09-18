import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITurmaACC } from 'app/shared/model/turma-acc.model';

@Component({
  selector: 'jhi-turma-acc-detail',
  templateUrl: './turma-acc-detail.component.html'
})
export class TurmaACCDetailComponent implements OnInit {
  turmaACC: ITurmaACC;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ turmaACC }) => {
      this.turmaACC = turmaACC;
    });
  }

  previousState() {
    window.history.back();
  }
}
