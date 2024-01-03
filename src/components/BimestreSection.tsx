import styles from './BimestreSection.module.css';

import { Bimestre, Disciplina } from '../api/types/Resultado';
import DisciplinaArticle from './DisciplinaArticle';
import plusIcon from '../assets/plus.svg';

type BimestreSectionProps = {
  bimestre: Bimestre;
};

export default function BimestreSection({ bimestre }: BimestreSectionProps) {
  return (
    <section className={styles.bimestre}>
      <header>
        <h2 className={`${styles.title} clippable`}>
          {bimestre.toLowerCase()}
        </h2>

        <button className={styles.create} type="button">
          <span className={styles.text}>Lançar Nota</span>
          <img className={styles.icon} src={plusIcon} alt="Mais" />
        </button>
      </header>

      <div className={styles.disciplina_grid}>
        {Object.values(Disciplina).map((key) => (
          <DisciplinaArticle
            disciplina={Disciplina[key]}
            key={`disciplina-${key}-${bimestre}`}
          />
        ))}
      </div>
    </section>
  );
}
