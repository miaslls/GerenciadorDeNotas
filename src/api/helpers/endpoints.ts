const baseURL = 'http://localhost:3000';

const resultadoEndpoint = `${baseURL}/resultados`;

const resultados = {
  endpoint: resultadoEndpoint,
  getResultados: resultadoEndpoint,
  createResultado: resultadoEndpoint,
  removeResultado: (id: string) => `${resultadoEndpoint}/${id}`,
};

export const endpoints = {
  baseURL,
  ...resultados,
};
