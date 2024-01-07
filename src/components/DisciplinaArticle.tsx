import styles from './DisciplinaArticle.module.css';

import { Resultado } from '../api/types/Resultado';
import { handleRemoveResultado } from '../api/resultados/removeResultado';
import { ChartIcon } from './ChartIcon';
import trashIcon from '../assets/trash.svg';

export default function DisciplinaArticle({
  disciplina,
  criadoEm,
  nota,
  id,
}: Resultado) {
  const date = new Date(criadoEm).toLocaleDateString('pt-BR');

  let notaColorClass: string;

  if (nota < 6) {
    notaColorClass = '--red';
  } else if (nota < 8) {
    notaColorClass = '--yellow';
  } else {
    notaColorClass = '--green';
  }

  return (
    <article className={`${styles.card} ${disciplina}`}>
      <header>
        <h3 className={`${styles.title} clippable`}>
          {disciplina.toLowerCase()}
        </h3>
        <p className={styles.date}>{date}</p>
      </header>

      <div className={`${styles.nota} ${styles[notaColorClass]}`}>
        <ChartIcon className={styles.icon} />
        <p className={styles.text}>Nota: {nota}</p>
      </div>

      <button
        className={styles.delete}
        type="button"
        onClick={() => handleRemoveResultado(id)}
        data-tooltip-id="tooltip"
        data-tooltip-content="Remover"
        data-tooltip-place="top"
      >
        <img className={styles.icon} src={trashIcon} alt="lixeira" />
      </button>
    </article>
  );
}
