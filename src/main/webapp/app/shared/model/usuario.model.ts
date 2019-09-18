import { Moment } from 'moment';
import { ICurso } from 'app/shared/model/curso.model';
import { ICertificado } from 'app/shared/model/certificado.model';
import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { Perfil } from 'app/shared/model/enumerations/perfil.model';

export interface IUsuario {
  id?: number;
  nome?: string;
  login?: string;
  senha?: string;
  dataCadastro?: Moment;
  ultimoLogin?: Moment;
  perfil?: Perfil;
  cursos?: ICurso[];
  certificados?: ICertificado;
  turmasResponsavel?: ITurmaACC;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public nome?: string,
    public login?: string,
    public senha?: string,
    public dataCadastro?: Moment,
    public ultimoLogin?: Moment,
    public perfil?: Perfil,
    public cursos?: ICurso[],
    public certificados?: ICertificado,
    public turmasResponsavel?: ITurmaACC
  ) {}
}
