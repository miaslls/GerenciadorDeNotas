import styles from './ResultadoModal.module.css';

import ResultadoForm from './ResultadoForm';
import xIcon from '../assets/x.svg';

type OverlayProps = {
  children: React.JSX.Element;
  // closeModal(): void;
};

function Overlay({ children }: OverlayProps) {
  return <div className={styles.overlay}>{children}</div>;
}

export default function ResultadoModal() {
  return (
    <Overlay>
      <section className={styles.modal}>
        <header>
          <h1 className={`${styles.title} clippable`}>Bimestre #</h1>

          <button className={styles.close} type="button">
            <img className={styles.icon} src={xIcon} alt="X" />
          </button>
        </header>

        <ResultadoForm />
      </section>
    </Overlay>
  );
}
