export enum Bimestre {
  PRIMEIRO = 'PRIMEIRO',
  SEGUNDO = 'SEGUNDO',
  TERCEIRO = 'TERCEIRO',
  QUARTO = 'QUARTO',
}

export enum Disciplina {
  BIOLOGIA = 'BIOLOGIA',
  ARTES = 'ARTES',
  GEOGRAFIA = 'GEOGRAFIA',
  SOCIOLOGIA = 'SOCIOLOGIA',
}

export type Resultado = {
  id: string;
  bimestre: Bimestre;
  disciplina: Disciplina;
  nota: number;
  criadoEm: Date;
  atualizadoEm: Date;
};
