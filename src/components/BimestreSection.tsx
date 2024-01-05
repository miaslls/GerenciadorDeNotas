import styles from './BimestreSection.module.css';

import { Bimestre, BimestreAlias, Resultado } from '../api/types/Resultado';
import { useResultados } from '../api/resultados/useResultados';
import DisciplinaArticle from './DisciplinaArticle';
import plusIcon from '../assets/plus.svg';

type BimestreSectionProps = {
  bimestre: Bimestre;
  openModal(bimestre: Bimestre): void;
};

export default function BimestreSection({
  bimestre,
  openModal,
}: BimestreSectionProps) {
  const { filteredResultados, isLoading, isError } = useResultados(bimestre);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Falha ao carregar o conteúdo</div>;
  }

  return (
    <section className={styles.bimestre}>
      <header>
        <h2 className={`${styles.title} clippable`}>
          {BimestreAlias[bimestre]}
        </h2>

        <button
          className={`${styles.create} default--active`}
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
        {filteredResultados.map((resultado: Resultado) => (
          <DisciplinaArticle
            {...resultado}
            key={`disciplina-${resultado.disciplina}-${resultado.bimestre}`}
          />
        ))}
      </div>
    </section>
  );
}
