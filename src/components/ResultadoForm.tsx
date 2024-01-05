import styles from './ResultadoForm.module.css';

import { Disciplina } from '../api/types/Resultado';

export default function ResultadoForm() {
  return (
    <form className={styles.resultado_form}>
      <fieldset className={styles.disciplina_grid}>
        <legend className={styles.title}>Disciplina</legend>

        {Object.values(Disciplina).map((key) => (
          <input
            className={`${styles.disciplina_input} ${key}--inactive`}
            key={`input-${key}-${'⚠️ FIXME: add bimestre here'}`}
            value={key.toLowerCase()}
            type="button"
          />
        ))}
      </fieldset>

      <label className={styles.nota}>
        Nota:
        <input
          className={styles.nota_input}
          type="number"
          name="nota"
          min={0}
          max={10}
          step={0.1}
        />
      </label>

      <button className={`${styles.submit} default--active`} type="submit">
        Confirmar
      </button>
    </form>
  );
}
