import styles from './BimestreSection.module.css';

import { Bimestre, Disciplina } from '../api/types/Resultado';
import DisciplinaArticle from './DisciplinaArticle';

type BimestreSectionProps = {
  bimestre: Bimestre;
};

export default function BimestreSection({ bimestre }: BimestreSectionProps) {
  return (
    <section className={styles.container}>
      <header>
        <h2>{bimestre}</h2>
      </header>

      <div className={styles.disciplina_grid}>
        {Object.values(Disciplina).map((key) => (
          <div
            className={styles.disciplina_item}
            key={`disciplina-${key}-${bimestre}`}
          >
            <DisciplinaArticle disciplina={Disciplina[key]} />
          </div>
        ))}
      </div>
    </section>
  );
}
