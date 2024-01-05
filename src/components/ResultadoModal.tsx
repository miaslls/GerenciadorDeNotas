import styles from './ResultadoModal.module.css';

import { Bimestre, BimestreAlias } from '../api/types/Resultado';
import ResultadoForm from './ResultadoForm';
import xIcon from '../assets/x.svg';

type OverlayProps = {
  children: React.JSX.Element;
  closeModal(): void;
};

function Overlay({ children, closeModal }: OverlayProps) {
  return (
    <div className={styles.overlay} onClick={() => closeModal()}>
      {children}
    </div>
  );
}

type ResultadoModalProps = {
  bimestre: Bimestre;
  closeModal(): void;
};

export default function ResultadoModal({
  bimestre,
  closeModal,
}: ResultadoModalProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement | HTMLElement>) {
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLButtonElement) {
      closeModal();
    }
  }

  return (
    <Overlay closeModal={closeModal}>
      <section className={styles.modal} onClick={handleClick}>
        <header>
          <h1 className={`${styles.title} clippable`}>
            {BimestreAlias[bimestre]}
          </h1>

          <button className={styles.close} type="button" onClick={handleClick}>
            <img className={styles.icon} src={xIcon} alt="X" />
          </button>
        </header>

        <ResultadoForm />
      </section>
    </Overlay>
  );
}
