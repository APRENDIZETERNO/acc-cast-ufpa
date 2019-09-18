import { Moment } from 'moment';
import { IUsuario } from 'app/shared/model/usuario.model';
import { ICertificado } from 'app/shared/model/certificado.model';
import { ICurso } from 'app/shared/model/curso.model';

export interface ITurmaACC {
  id?: number;
  nome?: string;
  pontuacao?: number;
  inicio?: Moment;
  prazoEnvio?: Moment;
  responsavels?: IUsuario[];
  certificados?: ICertificado;
  cursos?: ICurso[];
}

export class TurmaACC implements ITurmaACC {
  constructor(
    public id?: number,
    public nome?: string,
    public pontuacao?: number,
    public inicio?: Moment,
    public prazoEnvio?: Moment,
    public responsavels?: IUsuario[],
    public certificados?: ICertificado,
    public cursos?: ICurso[]
  ) {}
}
