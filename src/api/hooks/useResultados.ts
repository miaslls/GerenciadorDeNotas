import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';

export function useResultados({ grouped }: { grouped?: boolean }) {
  const url = `http://localhost:3000/resultados/${
    grouped ? '?groupby=bimestre' : ''
  }`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}
