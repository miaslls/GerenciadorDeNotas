import styles from './BimestreSection.module.css';

import { Bimestre, BimestreAlias, Resultado } from '../../api/types/Resultado';
import DisciplinaArticle from './DisciplinaArticle';
import plusIcon from '../../assets/plus.svg';

type BimestreSectionProps = {
  bimestre: Bimestre;
  resultados: Resultado[];
  openModal(bimestre: Bimestre): void;
};

export default function BimestreSection({
  bimestre,
  resultados,
  openModal,
}: BimestreSectionProps) {
  return (
    <section className={styles.bimestre}>
      <header>
        <h2 className={`${styles.title} clippable`}>
          {BimestreAlias[bimestre]}
        </h2>

        <button
          className={`${styles.create} default`}
          type="button"
          onClick={() => openModal(bimestre)}
          data-tooltip-id="tooltip"
          data-tooltip-content="Adicionar"
          data-tooltip-place="top"
        >
          <span className={styles.text}>Lançar Nota</span>
          <img className={styles.icon} src={plusIcon} alt="Mais" />
        </button>
      </header>

      <div className={styles.disciplina_grid}>
        {resultados.map((resultado: Resultado) => (
          <DisciplinaArticle
            {...resultado}
            key={`disciplina-${resultado.disciplina}-${resultado.bimestre}`}
          />
        ))}
      </div>
    </section>
  );
}
