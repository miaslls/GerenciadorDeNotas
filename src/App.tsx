import './styles/global.css';

import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';
import { Bimestre } from './api/types/Resultado';
import BimestreSection from './components/BimestreSection';
import ResultadoModal from './components/ResultadoModal';

type ModalState = {
  isOpen: boolean;
  bimestre?: Bimestre;
};

function App() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  useEffect(() => {
    function applyBodyOverflow(modalIsOpen: boolean) {
      document.body.style.overflowY = modalIsOpen ? 'hidden' : 'auto';
    }

    applyBodyOverflow(modalState.isOpen);

    return () => {
      applyBodyOverflow(false);
    };
  }, [modalState.isOpen]);

  function handleModalState(bimestre?: Bimestre) {
    if (!bimestre) {
      setModalState({ isOpen: false });
    }

    setModalState({
      isOpen: true,
      bimestre,
    });
  }

  return (
    <>
      <Tooltip id="tooltip" />

      <Toaster
        toastOptions={{
          style: {
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            borderRadius: '1rem',
          },
        }}
      />

      <main className="page">
        {Object.values(Bimestre).map((key) => (
          <BimestreSection
            bimestre={Bimestre[key]}
            openModal={handleModalState}
            key={`bimestre-${key}`}
          />
        ))}
      </main>

      {modalState.isOpen && modalState.bimestre && (
        <ResultadoModal
          closeModal={handleModalState}
          bimestre={modalState.bimestre}
        />
      )}
    </>
  );
}

export default App;
