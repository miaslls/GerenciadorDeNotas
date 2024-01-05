import styles from './BimestreSection.module.css';

import { Bimestre, BimestreAlias, Resultado } from '../api/types/Resultado';
import { useResultados } from '../api/resultados/useResultados';
import DisciplinaArticle from './DisciplinaArticle';
import plusIcon from '../assets/plus.svg';

type BimestreSectionProps = {
  bimestre: Bimestre;
  openModal(): void;
};

export default function BimestreSection({
  bimestre,
  openModal,
}: BimestreSectionProps) {
  const { resultados, isLoading, isError } = useResultados();

  if (isLoading) {
    return <div>carregando...</div>;
  }

  if (isError) {
    return <div>falha ao carregar conteúdo</div>;
  }

  const filteredResultados = resultados.filter(
    (resultado: Resultado) => resultado.bimestre === bimestre
  );

  return (
    <section className={styles.bimestre}>
      <header>
        <h2 className={`${styles.title} clippable`}>
          {BimestreAlias[bimestre]}
        </h2>

        <button
          className={`${styles.create} default--active`}
          type="button"
          onClick={() => openModal()}
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
