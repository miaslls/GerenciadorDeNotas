const baseURL = 'http://localhost:3000';

const resultadosEndpoint = `${baseURL}/resultados`;

const resultados = {
  getResultados: resultadosEndpoint,
  createResultado: resultadosEndpoint,
  removeResultado: (id: string) => `${resultadosEndpoint}/${id}`,
};

export const endpoints = {
  baseURL,
  ...resultados,
};
