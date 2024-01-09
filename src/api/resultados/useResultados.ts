import useSWR from 'swr';
import { fetcher } from '../helpers/fetcher';
import { endpoints } from '../helpers/endpoints';
import { Bimestre, Resultado } from '../types/Resultado';

// Hook personalizado para buscar e agrupar resultados por bimestre
export function useResultadosGroupedByBimestre() {
  const {
    data: resultados,
    isLoading,
    error,
  } = useSWR<Resultado[]>(endpoints.getResultados, fetcher);

  // Inicializa um array para agrupar resultados por bimestre
  const groupedBimestres = Array.from(
    Object.values(Bimestre),
    (bimestre) => [bimestre, []] as [Bimestre, Resultado[]]
  );

  // Converte o array groupedBimestres em um objeto
  const resultadosGroupedByBimestre = Object.fromEntries(groupedBimestres);

  // Popula o objeto resultadosGroupedByBimestre com os resultados buscados
  if (resultados) {
    for (const resultado of resultados) {
      resultadosGroupedByBimestre[resultado.bimestre].push(resultado);
    }
  }

  // Retorna os resultados agrupados, assim como os estados de carregamento e erro
  return {
    resultadosGroupedByBimestre,
    isLoading,
    error,
  };
}
