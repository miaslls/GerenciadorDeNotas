export enum Bimestre {
  PRIMEIRO = 'PRIMEIRO',
  SEGUNDO = 'SEGUNDO',
  TERCEIRO = 'TERCEIRO',
  QUARTO = 'QUARTO',
}

// Enum que fornece aliases para fins de exibição
export enum BimestreAlias {
  PRIMEIRO = 'Bimestre 1',
  SEGUNDO = 'Bimestre 2',
  TERCEIRO = 'Bimestre 3',
  QUARTO = 'Bimestre 4',
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

// Tipo que representa um resultado para transferência de dados
// Seleciona um subconjunto das propriedades de Resultado
export type ResultadoDTO = Pick<Resultado, 'bimestre' | 'disciplina' | 'nota'>;
