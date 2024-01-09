import { ChangeEvent, useState } from 'react';
import { Resultado, Bimestre, Disciplina } from '../../api/types/Resultado';

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

type FormStateAndHandlers = [
  FormState,
  {
    isFormSubmissable(): boolean;
    isDisciplinaActive(disciplina: Disciplina): boolean;
    handleDisciplinaClick(disciplina: Disciplina): void;
    handleNotaInput(e: ChangeEvent<HTMLInputElement>): void;
  }
];

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

  if (resultados.length > 0) {
    for (const resultado of resultados) {
      initialForm.notas[resultado.disciplina] = resultado.nota;
      initialForm.readonlyDisciplinas.push(resultado.disciplina);
    }

    if (resultados.length < 4) {
      const activeKey = Object.entries(initialForm.notas)
        .filter(([_, nota]) => nota === '')
        .map(([key]) => key as Disciplina)[0];

      initialForm.activeDisciplina = Disciplina[activeKey];
    }

    initialForm.currentNota = {
      value: initialForm.notas[initialForm.activeDisciplina],
      isReadonly: initialForm.readonlyDisciplinas.includes(
        initialForm.activeDisciplina
      ),
    };
  }

  return initialForm;
}

export function useResultadoForm(
  bimestre: Bimestre,
  resultados: Resultado[]
): FormStateAndHandlers {
  const [formState, setFormState] = useState<FormState>(() => {
    return buildInitialFormState(bimestre, resultados);
  });

  const isFormSubmissable = () => {
    const definedNotas = Object.values(formState.notas).filter(
      (nota) => nota !== ''
    );

    if (definedNotas.length > formState.readonlyDisciplinas.length) {
      return true;
    }

    return false;
  };

  const isDisciplinaActive = (disciplina: Disciplina) => {
    return disciplina === formState.activeDisciplina;
  };

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

    const input = document.querySelector(
      "input[name='nota']"
    ) as HTMLInputElement;

    input.focus();
  }

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
