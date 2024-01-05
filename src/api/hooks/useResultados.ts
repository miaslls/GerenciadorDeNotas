import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';

export function useResultados() {
  const url = 'http://localhost:3000/resultados/';

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    resultados: data,
    isLoading,
    isError: error,
  };
}
