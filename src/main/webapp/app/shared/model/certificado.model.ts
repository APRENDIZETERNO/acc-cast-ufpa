import { Moment } from 'moment';
import { IUsuario } from 'app/shared/model/usuario.model';
import { ITurmaACC } from 'app/shared/model/turma-acc.model';
import { TipoCertificado } from 'app/shared/model/enumerations/tipo-certificado.model';
import { StatusCertificado } from 'app/shared/model/enumerations/status-certificado.model';

export interface ICertificado {
  id?: number;
  titulo?: string;
  descricao?: string;
  dataEnvio?: Moment;
  motivoPendente?: string;
  motivoRejeitado?: string;
  motivoParcial?: string;
  tipo?: TipoCertificado;
  chPedida?: number;
  chConcedida?: number;
  estado?: StatusCertificado;
  caminhoArquivo?: string;
  alunos?: IUsuario[];
  turmas?: ITurmaACC[];
}

export class Certificado implements ICertificado {
  constructor(
    public id?: number,
    public titulo?: string,
    public descricao?: string,
    public dataEnvio?: Moment,
    public motivoPendente?: string,
    public motivoRejeitado?: string,
    public motivoParcial?: string,
    public tipo?: TipoCertificado,
    public chPedida?: number,
    public chConcedida?: number,
    public estado?: StatusCertificado,
    public caminhoArquivo?: string,
    public alunos?: IUsuario[],
    public turmas?: ITurmaACC[]
  ) {}
}
