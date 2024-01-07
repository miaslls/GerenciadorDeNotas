import { mutate } from 'swr';
import { ResultadoDTO } from '../types/Resultado';
import { endpoints } from '../helpers/endpoints';

async function createResultado(data: ResultadoDTO) {
  const response = await fetch(endpoints.createResultado(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();

    return error.message;
  }
}

export async function handleCreateResultados(data: ResultadoDTO[]) {
  const results = await Promise.all(data.map((dto) => createResultado(dto)));

  const errorMessages = results.filter((result) => result);
  const success = results.length - errorMessages.length;

  if (success > 0) {
    mutate(endpoints.getResultados());
  }

  if (errorMessages.length > 0) {
    return errorMessages;
  }
}
