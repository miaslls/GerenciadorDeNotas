import './styles/global.css';

import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';
import { Bimestre } from './api/types/Resultado';
import { useResultadoModal } from './components/modal/useResultadoModal';
import { useResultadosGroupedByBimestre } from './api/resultados/useResultados';
import BimestreSection from './components/page/BimestreSection';
import ResultadoModal from './components/modal/ResultadoModal';

function App() {
  const { modalState, handleModalState } = useResultadoModal();

  const {
    resultadosGroupedByBimestre: resultados,
    isLoading,
    error,
  } = useResultadosGroupedByBimestre();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Falha ao carregar resultados</div>;
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
        {Object.values(Bimestre).map((bimestre) => (
          <BimestreSection
            resultados={resultados[bimestre]}
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
          resultados={resultados[modalState.bimestre]}
        />
      )}
    </>
  );
}

export default App;
