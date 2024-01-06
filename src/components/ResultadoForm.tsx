import styles from './ResultadoForm.module.css';

import { ChangeEvent, useState } from 'react';
import { Resultado, Bimestre, Disciplina } from '../api/types/Resultado';
import { useResultados } from '../api/resultados/useResultados';

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

export default function ResultadoForm({ bimestre }: { bimestre: Bimestre }) {
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

  function handleDisciplinaClick(disciplina: Disciplina) {
    const newNota = formState.notas[disciplina];
    setFormState({
      ...formState,
      activeDisciplina: disciplina,
      currentNota: {
        value: newNota,
        isReadonly: formState.readonlyDisciplinas.includes(disciplina),
      },
    });
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

  const isDisciplinaActive = (disciplina: Disciplina) => {
    return disciplina === formState.activeDisciplina;
  };

  return (
    <form className={styles.resultado_form}>
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

      <button className={`${styles.submit} default--active`} type="submit">
        Confirmar
      </button>
    </form>
  );
}
