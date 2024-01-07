import { mutate } from 'swr';
import { toast } from 'react-hot-toast';
import { endpoints } from '../helpers/endpoints';

export async function handleRemoveResultado(id: string) {
  const toastId = toast.loading('Carregando...');

  const response = await fetch(endpoints.removeResultado(id), {
    method: 'DELETE',
  });

  if (response.ok) {
    toast.success('Resultado removido', { id: toastId });
    mutate(endpoints.getResultados());
  } else {
    const error = await response.json();
    toast.error(error.message, { id: toastId });
  }
}
