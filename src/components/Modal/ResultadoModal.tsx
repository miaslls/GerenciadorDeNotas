import styles from './ResultadoModal.module.css';

import { Tooltip } from 'react-tooltip';
import { Bimestre, BimestreAlias, Resultado } from '../../api/types/Resultado';
import ResultadoForm from '../form/ResultadoForm';
import xIcon from '../../assets/x.svg';

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
  resultados: Resultado[];
  closeModal(): void;
};

export default function ResultadoModal({
  bimestre,
  resultados,
  closeModal,
}: ResultadoModalProps) {
  function handleUIClick(e: React.MouseEvent<HTMLButtonElement | HTMLElement>) {
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLButtonElement) {
      closeModal();
    }
  }

  return (
    <Overlay closeModal={closeModal}>
      <>
        <Tooltip id="modal_tooltip" />

        <section className={styles.modal} onClick={handleUIClick}>
          <header>
            <h1 className={`${styles.title} clippable`}>
              {BimestreAlias[bimestre]}
            </h1>

            <button
              className={styles.close}
              type="button"
              onClick={handleUIClick}
            >
              <img
                className={styles.icon}
                src={xIcon}
                alt="X"
                data-tooltip-id="modal_tooltip"
                data-tooltip-place="top"
                data-tooltip-content="Fechar"
              />
            </button>
          </header>

          <ResultadoForm
            bimestre={bimestre}
            resultados={resultados}
            closeModal={closeModal}
          />
        </section>
      </>
    </Overlay>
  );
}
