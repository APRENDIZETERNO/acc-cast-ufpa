export interface ITipoCertificado {
  id?: number;
  nome?: string;
}

export class TipoCertificado implements ITipoCertificado {
  constructor(public id?: number, public nome?: string) {}
}
