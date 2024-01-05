import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';

export function useResultados() {
  const url = 'http://localhost:3000/resultados/';

  const { data: resultados, isLoading, error } = useSWR(url, fetcher);

  return {
    resultados,
    isLoading,
    isError: error,
  };
}
