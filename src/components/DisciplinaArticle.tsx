import styles from './DisciplinaArticle.module.css';

import { Disciplina } from '../api/types/Resultado';
import chartIcon from '../assets/chart.svg';
import trashIcon from '../assets/trash.svg';

type DisciplinaArticleProps = {
  disciplina: Disciplina;
};

export default function DisciplinaArticle({
  disciplina,
}: DisciplinaArticleProps) {
  return (
    <article className={`${styles.card} ${styles[disciplina]}`}>
      <header>
        <h3 className={styles.title}>{disciplina.toLowerCase()}</h3>
        <p className={styles.date}>02/01/2023</p>
      </header>

      <div className={styles.nota}>
        <img className={styles.icon} src={chartIcon} alt="gráfico" />
        <p className={styles.text}>Nota: 5</p>
      </div>

      <button className={styles.delete_btn}>
        <img className={styles.icon} src={trashIcon} alt="lixeira" />
      </button>
    </article>
  );
}
