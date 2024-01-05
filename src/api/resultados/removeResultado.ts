import { mutate } from 'swr';
import { toast } from 'react-hot-toast';

export async function removeResultado(id: string) {
  const toastId = toast.loading('carregando...');

  const baseUrl = 'http://localhost:3000';
  const resultados = `${baseUrl}/resultados/`;
  const currentUrl = resultados + id;

  const response = await fetch(currentUrl, { method: 'DELETE' });

  if (response.ok) {
    toast.success('Resultado removido', { id: toastId });
    mutate(resultados);
  } else {
    const error = await response.json();
    toast.error(error.message, { id: toastId });
  }
}
