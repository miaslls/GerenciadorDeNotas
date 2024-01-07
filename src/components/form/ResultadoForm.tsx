import styles from './ResultadoForm.module.css';

import toast from 'react-hot-toast';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Resultado,
  Bimestre,
  Disciplina,
  ResultadoDTO,
} from '../../api/types/Resultado';
import { useResultados } from '../../api/resultados/useResultados';
import { handleCreateResultados } from '../../api/resultados/createResultados';

type FormState = {
  bimestre: Bimestre;
  activeDisciplina: Disciplina;
  readonlyDisciplinas: Disciplina[];
  notas: Record<Disciplina, number | ''>;
  currentNota: {
    value: number | '';
    isReadonly: boolean;
  };
};

async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  formData: FormState,
  close: CallableFunction
) {
  e.preventDefault();
  close();

  const toastId = toast.loading('Carregando...');

  const postDisciplinas = Object.values(Disciplina).filter(
    (disciplina) =>
      !formData.readonlyDisciplinas.includes(disciplina) &&
      typeof formData.notas[disciplina] === 'number'
  );

  const postData = postDisciplinas.map((disciplina) => ({
    disciplina,
    bimestre: formData.bimestre,
    nota: formData.notas[disciplina],
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

export default function ResultadoForm({
  bimestre,
  close,
}: {
  bimestre: Bimestre;
  close(): void;
}) {
  const {
    resultadosByBimestre: resultados,
    isLoading,
    isError,
  } = useResultados(bimestre);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Falha ao carregar o conteúdo</div>;
  }

  const initialFormState = (
    bimestre: Bimestre,
    resultados: Resultado[]
  ): FormState => {
    const form: FormState = {
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
      resultados.forEach((resultado) => {
        form.notas[resultado.disciplina] = resultado.nota;
        form.readonlyDisciplinas.push(resultado.disciplina);
      });

      if (resultados.length < 4) {
        const activeKey = Object.entries(form.notas)
          .filter(([_, nota]) => nota === '')
          .map(([key]) => key as Disciplina)[0];

        form.activeDisciplina = Disciplina[activeKey];
      }

      form.currentNota = {
        value: form.notas[form.activeDisciplina],
        isReadonly: form.readonlyDisciplinas.includes(form.activeDisciplina),
      };
    }

    return form;
  };

  const [formState, setFormState] = useState<FormState>(
    initialFormState(bimestre, resultados)
  );

  const isDisciplinaActive = (disciplina: Disciplina) => {
    return disciplina === formState.activeDisciplina;
  };

  const isFormSubmissable = (form: FormState) => {
    const definedNotas = Object.values(form.notas).filter(
      (nota) => nota !== ''
    );

    if (definedNotas.length > form.readonlyDisciplinas.length) {
      return true;
    }

    return false;
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

  return (
    <form
      className={styles.resultado_form}
      onSubmit={(e) => handleSubmit(e, formState, close)}
      autoComplete="off"
    >
      <fieldset className={styles.disciplina_grid}>
        <legend className={styles.title}>Disciplina</legend>

        {Object.values(Disciplina).map((disciplina) => (
          <input
            onClick={() => handleDisciplinaClick(disciplina)}
            className={`${styles.disciplina_input} ${
              isDisciplinaActive(disciplina)
                ? disciplina
                : disciplina + '--inactive'
            }`}
            key={`input-${disciplina}-${bimestre}`}
            value={disciplina.toLowerCase()}
            type="button"
          />
        ))}
      </fieldset>

      <label className={styles.nota}>
        Nota:
        <input
          className={styles.nota_input}
          value={formState.currentNota.value}
          readOnly={formState.currentNota.isReadonly}
          onChange={(e) => handleNotaInput(e)}
          type="number"
          name="nota"
          min={0}
          max={10}
          step={0.1}
          autoFocus
        />
      </label>

      <button
        className={`${styles.submit} default`}
        disabled={!isFormSubmissable(formState)}
        type="submit"
        data-tooltip-id="modal_tooltip"
        data-tooltip-place="top"
        data-tooltip-content={
          isFormSubmissable(formState)
            ? 'Lançar nota(s)'
            : 'Não há notas a lançar'
        }
      >
        Confirmar
      </button>
    </form>
  );
}
