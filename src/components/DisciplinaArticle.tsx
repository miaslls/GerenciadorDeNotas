import styles from './DisciplinaArticle.module.css';

import { Resultado } from '../api/types/Resultado';
import chartIcon from '../assets/chart.svg';
import trashIcon from '../assets/trash.svg';

export default function DisciplinaArticle({
  disciplina,
  criadoEm,
  nota,
}: Resultado) {
  const date = new Date(criadoEm).toLocaleDateString('pt-BR');

  return (
    <article className={`${styles.card} ${disciplina}`}>
      <header>
        <h3 className={`${styles.title} clippable`}>
          {disciplina.toLowerCase()}
        </h3>
        <p className={styles.date}>{date}</p>
      </header>

      {/* TODO: conditional colors for nota */}

      <div className={styles.nota}>
        <img className={styles.icon} src={chartIcon} alt="gráfico" />
        <p className={styles.text}>Nota: {nota}</p>
      </div>

      <button className={styles.delete} type="button">
        <img className={styles.icon} src={trashIcon} alt="lixeira" />
      </button>
    </article>
  );
}
