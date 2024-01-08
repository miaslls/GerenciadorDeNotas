import './styles/global.css';

import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';
import { Bimestre } from './api/types/Resultado';
import { useModal } from './components/modal/ModalContextProvider';
import BimestreSection from './components/page/BimestreSection';
import ResultadoModal from './components/modal/ResultadoModal';

function App() {
  const { modalState, handleModalState } = useModal();

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
        {Object.values(Bimestre).map((bimestre) => (
          <BimestreSection
            bimestre={bimestre}
            openModal={handleModalState}
            key={`bimestre-${bimestre}`}
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
