import toast from 'react-hot-toast';
import { FormEvent } from 'react';
import { FormState } from './useResultadoForm';
import { handleCreateResultados } from '../../api/resultados/createResultados';
import { ResultadoDTO, Disciplina } from '../../api/types/Resultado';

export async function handleSubmitResultados(
  e: FormEvent<HTMLFormElement>,
  form: FormState,
  closeModal: CallableFunction
) {
  e.preventDefault();
  closeModal();

  const toastId = toast.loading('Carregando...');

  const postDisciplinas = Object.values(Disciplina).filter(
    (disciplina) =>
      !form.readonlyDisciplinas.includes(disciplina) &&
      typeof form.notas[disciplina] === 'number'
  );

  const postData = postDisciplinas.map((disciplina) => ({
    disciplina,
    bimestre: form.bimestre,
    nota: form.notas[disciplina],
  })) as ResultadoDTO[];

  const errorMessages = await handleCreateResultados(postData);

  if (!errorMessages) {
    toast.success(`${postData.length} nota(s) lançada(s)`, { id: toastId });
    return;
  }

  const errorString = errorMessages.join('; ');

  if (errorMessages.length === postData.length) {
    toast.error(`Falha ao lançar nota(s); Erro(s): ${errorString}`, {
      id: toastId,
    });

    return;
  }

  const success = postData.length - errorMessages.length;

  toast(
    `${success} nota(s) lançada(s); ${errorMessages.length} erro(s): ${errorString}`,
    { id: toastId }
  );
}
