const baseURL = 'http://localhost:3000';

const resultados = {
  endpoint: () => `${baseURL}/resultados`,

  getResultados: () => resultados.endpoint(),
  createResultado: () => resultados.endpoint(),
  removeResultado: (id: string) => `${resultados.endpoint()}/${id}`,
};

export const endpoints = {
  baseURL,
  ...resultados,
};
