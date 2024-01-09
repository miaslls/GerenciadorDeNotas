import toast from 'react-hot-toast';
import { FormEvent } from 'react';
import { FormState } from './useResultadoForm';
import { handleCreateResultados } from '../../api/resultados/createResultados';
import { ResultadoDTO, Disciplina } from '../../api/types/Resultado';

// Função assíncrona para lidar com a submissão dos dados de resultados
export async function handleSubmitResultados(
  // Objeto de evento representando a submissão do formulário
  e: FormEvent<HTMLFormElement>,
  // Estado atual do formulário
  form: FormState,
  // Função para fechar o modal após a submissão
  closeModal: CallableFunction
) {
  e.preventDefault();
  closeModal();

  const toastId = toast.loading('Carregando...');

  // Filtra disciplinas a ser submetidas com base no estado do formulário
  const postDisciplinas = Object.values(Disciplina).filter(
    (disciplina) =>
      !form.readonlyDisciplinas.includes(disciplina) &&
      typeof form.notas[disciplina] === 'number'
  );

  // Cria um payload para a API com base nas disciplinas a ser submetidas
  const postData = postDisciplinas.map((disciplina) => ({
    disciplina,
    bimestre: form.bimestre,
    nota: form.notas[disciplina],
  })) as ResultadoDTO[];

  // Lida com a criação de resultados via API
  const errorMessages = await handleCreateResultados(postData);

  // Verifica se não há erros na resposta da API
  if (!errorMessages) {
    // Exibe uma mensagem de sucesso com o número de resultados criados
    toast.success(`${postData.length} nota(s) lançada(s)`, { id: toastId });
    return;
  }

  // Concatena mensagens de erro em uma única string
  const errorString = errorMessages.join('; ');

  // Verifica se todas as submissões resultaram em erros
  if (errorMessages.length === postData.length) {
    // Exibe uma mensagem de erro indicando falha na criação de resultados
    toast.error(`Falha ao lançar nota(s); Erro(s): ${errorString}`, {
      id: toastId,
    });

    return;
  }

  // Calcula o número de submissões bem-sucedidas
  const success = postData.length - errorMessages.length;

  // Exibindo uma mensagem indicando uma mistura de sucessos e erros
  toast(
    `${success} nota(s) lançada(s); ${errorMessages.length} erro(s): ${errorString}`,
    { id: toastId }
  );
}
