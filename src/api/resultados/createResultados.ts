import { mutate } from 'swr';
import { ResultadoDTO } from '../types/Resultado';
import { endpoints } from '../helpers/endpoints';

async function createResultado(data: ResultadoDTO) {
  const response = await fetch(endpoints.createResultado, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();

    return error.message;
  }
}

// Função assíncrona responsável por lidar com a criação de vários resultados
export async function handleCreateResultados(data: ResultadoDTO[]) {
  // Utiliza o método 'Promise.all' para aguardar a conclusão de todas as criações de resultado
  const results = await Promise.all(data.map((dto) => createResultado(dto)));

  // Filtra os resultados para obter mensagens de erro
  const errorMessages = results.filter((result) => result);
  // Calcula o número de resultados criados com sucesso
  const success = results.length - errorMessages.length;

  // Se houver resultados criados com sucesso, atualiza o cache local utilizando o SWR
  if (success > 0) {
    mutate(endpoints.getResultados);
  }

  // Se houver mensagens de erro, as retorna; caso contrário, retorna undefined
  if (errorMessages.length > 0) {
    return errorMessages;
  }
}
