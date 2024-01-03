import styles from './DisciplinaArticle.module.css';

import { Disciplina } from '../api/types/Resultado';

type DisciplinaArticleProps = {
  disciplina: Disciplina;
};

export default function DisciplinaArticle({
  disciplina,
}: DisciplinaArticleProps) {
  return (
    <article className={styles.container}>
      <div className={`${styles.card} ${styles[disciplina]}`}>
        <header>
          <h3>{disciplina}</h3>
        </header>
      </div>
    </article>
  );
}
