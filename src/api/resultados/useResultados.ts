import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { endpoints } from '../helpers/endpoints';
import { Bimestre, Resultado } from '../types/Resultado';

export function useResultadosGroupedByBimestre() {
  const {
    data: resultados,
    isLoading,
    error,
  } = useSWR<Resultado[]>(endpoints.getResultados, fetcher);

  const groupedBimestres = Object.values(Bimestre).map(
    (bimestre) => [bimestre, []] as [Bimestre, Resultado[]]
  );

  const resultadosGroupedByBimestre = Object.fromEntries(
    groupedBimestres
  ) as Record<Bimestre, Resultado[]>;

  if (resultados) {
    for (const resultado of resultados) {
      resultadosGroupedByBimestre[resultado.bimestre].push(resultado);
    }
  }

  return {
    resultadosGroupedByBimestre,
    isLoading,
    error,
  };
}
