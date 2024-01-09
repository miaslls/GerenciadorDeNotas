import styles from './ResultadoForm.module.css';

import { Bimestre, Disciplina, Resultado } from '../../api/types/Resultado';
import { useResultadoForm } from './useResultadoForm';
import { handleSubmitResultados } from './handleSubmitResultados';

type ResultadoFormProps = {
  bimestre: Bimestre;
  resultados: Resultado[];
  closeModal(): void;
};

export default function ResultadoForm({
  bimestre,
  resultados,
  closeModal,
}: ResultadoFormProps) {
  const [formState, formHandlers] = useResultadoForm(bimestre, resultados);

  const {
    isDisciplinaActive,
    isFormSubmissable,
    handleDisciplinaClick,
    handleNotaInput,
  } = formHandlers;

  return (
    <form
      className={styles.resultado_form}
      onSubmit={(e) => handleSubmitResultados(e, formState, closeModal)}
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
