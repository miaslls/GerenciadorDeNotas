import { ChangeEvent, useState } from 'react';
import { Resultado, Bimestre, Disciplina } from '../../api/types/Resultado';

// Tipo que define o estado do formulário
export type FormState = {
  bimestre: Bimestre;
  activeDisciplina: Disciplina;
  readonlyDisciplinas: Disciplina[];
  notas: Record<Disciplina, number | ''>;
  currentNota: {
    value: number | '';
    isReadonly: boolean;
  };
};

// Tipo que define a combinação entre o estado do formulário e seus handlers
type FormStateAndHandlers = [
  FormState,
  {
    isFormSubmissable(): boolean;
    isDisciplinaActive(disciplina: Disciplina): boolean;
    handleDisciplinaClick(disciplina: Disciplina): void;
    handleNotaInput(e: ChangeEvent<HTMLInputElement>): void;
  }
];

// Função para construir o estado inicial do formulário
function buildInitialFormState(
  bimestre: Bimestre,
  resultados: Resultado[]
): FormState {
  const initialForm: FormState = {
    bimestre,
    activeDisciplina: Disciplina.BIOLOGIA,
    readonlyDisciplinas: [],
    notas: {
      BIOLOGIA: '',
      ARTES: '',
      GEOGRAFIA: '',
      SOCIOLOGIA: '',
    },
    currentNota: {
      value: '',
      isReadonly: false,
    },
  };

  // Popula o estado do formulário com resultados existentes
  // Adiciona disciplinas já preenchidas à lista de somente leitura
  if (resultados.length > 0) {
    for (const resultado of resultados) {
      initialForm.notas[resultado.disciplina] = resultado.nota;
      initialForm.readonlyDisciplinas.push(resultado.disciplina);
    }

    // Define a disciplina ativa com base na primeira nota vazia encontrada
    if (resultados.length < 4) {
      const activeKey = Object.entries(initialForm.notas)
        .filter(([_, nota]) => nota === '')
        .map(([key]) => key as Disciplina)[0];

      initialForm.activeDisciplina = Disciplina[activeKey];
    }

    // Define a nota atual com base na disciplina ativa, considerando se ela é somente leitura
    initialForm.currentNota = {
      value: initialForm.notas[initialForm.activeDisciplina],
      isReadonly: initialForm.readonlyDisciplinas.includes(
        initialForm.activeDisciplina
      ),
    };
  }

  // Retorna o estado inicial do formulário após ser populado com resultados existentes
  return initialForm;
}

// Hook personalizado para gerenciar o estado do formulário
export function useResultadoForm(
  bimestre: Bimestre,
  resultados: Resultado[]
): FormStateAndHandlers {
  const [formState, setFormState] = useState<FormState>(() => {
    return buildInitialFormState(bimestre, resultados);
  });

  // Função para verificar se o formulário está pronto para submissão
  const isFormSubmissable = () => {
    const definedNotas = Object.values(formState.notas).filter(
      (nota) => nota !== ''
    );

    if (definedNotas.length > formState.readonlyDisciplinas.length) {
      return true;
    }

    return false;
  };

  // Função para verificar se uma disciplina específica está atualmente ativa
  const isDisciplinaActive = (disciplina: Disciplina) => {
    return disciplina === formState.activeDisciplina;
  };

  // Função para lidar com um clique em um botão de disciplina
  function handleDisciplinaClick(disciplina: Disciplina) {
    const nota = formState.notas[disciplina];

    setFormState({
      ...formState,
      activeDisciplina: disciplina,
      currentNota: {
        value: nota,
        isReadonly: formState.readonlyDisciplinas.includes(disciplina),
      },
    });

    // Foca no input de nota após clicar em uma disciplina
    const input = document.querySelector(
      "input[name='nota']"
    ) as HTMLInputElement;

    input.focus();
  }

  // Função para lidar com mudanças de input no campo de nota
  function handleNotaInput(e: ChangeEvent<HTMLInputElement>) {
    const newNota = Number(e.target.value);

    setFormState({
      ...formState,
      notas: {
        ...formState.notas,
        [formState.activeDisciplina]: newNota,
      },
      currentNota: {
        value: newNota,
        isReadonly: false,
      },
    });
  }

  // Retorna o estado do formulário e seus handlers
  return [
    formState,
    {
      isDisciplinaActive,
      isFormSubmissable,
      handleDisciplinaClick,
      handleNotaInput,
    },
  ];
}
