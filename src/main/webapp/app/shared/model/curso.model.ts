import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { IUsuario } from 'app/shared/model/usuario.model';

export interface ICurso {
  id?: number;
  nome?: string;
  sigla?: string;
  turmasAccs?: ITurmaACC[];
  alunos?: IUsuario;
}

export class Curso implements ICurso {
  constructor(public id?: number, public nome?: string, public sigla?: string, public turmasAccs?: ITurmaACC[], public alunos?: IUsuario) {}
}
