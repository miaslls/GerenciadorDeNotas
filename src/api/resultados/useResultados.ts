import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { endpoints } from '../helpers/endpoints';
import { Bimestre, Resultado } from '../types/Resultado';

export function useResultados(bimestre?: Bimestre) {
  const {
    data: resultados,
    isLoading,
    error,
  } = useSWR(endpoints.getResultados, fetcher);

  if (!bimestre) {
    return {
      resultados,
      isLoading,
      isError: error,
    };
  }

  return {
    resultadosByBimestre: resultados?.filter(
      (resultado: Resultado) => resultado.bimestre === bimestre
    ),
    isLoading,
    isError: error,
  };
}
