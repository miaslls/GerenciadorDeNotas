import styles from './ResultadoForm.module.css';

import { Bimestre, Disciplina } from '../../api/types/Resultado';
import { useResultados } from '../../api/resultados/useResultados';
import { useForm } from './useForm';
import { useSubmit } from './useSubmit';

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

  const [formState, formHandlers] = useForm(bimestre, resultados);

  const {
    isDisciplinaActive,
    isFormSubmissable,
    handleDisciplinaClick,
    handleNotaInput,
  } = formHandlers;

  const handleSubmit = useSubmit();

  return (
    <form
      className={styles.resultado_form}
      onSubmit={(e) => handleSubmit(e, formState)}
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
        disabled={!isFormSubmissable()}
        type="submit"
        data-tooltip-id="modal_tooltip"
        data-tooltip-place="top"
        data-tooltip-content={
          isFormSubmissable() ? 'Lançar nota(s)' : 'Não há notas a lançar'
        }
      >
        Confirmar
      </button>
    </form>
  );
}
