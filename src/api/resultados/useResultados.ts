import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { Bimestre, Resultado } from '../types/Resultado';

export function useResultados(bimestre?: Bimestre) {
  const url = 'http://localhost:3000/resultados/';
  const { data: resultados, isLoading, error } = useSWR(url, fetcher);

  if (!bimestre) {
    return {
      resultados,
      isLoading,
      isError: error,
    };
  }

  return {
    filteredResultados: resultados?.filter(
      (resultado: Resultado) => resultado.bimestre === bimestre
    ),
    isLoading,
    isError: error,
  };
}
