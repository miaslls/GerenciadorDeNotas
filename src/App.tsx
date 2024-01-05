import './styles/global.css';

import { useEffect, useState } from 'react';
import { useResultados } from './hooks/useResultados';
import { Bimestre } from './api/types/Resultado';
import BimestreSection from './components/BimestreSection';
import ResultadoModal from './components/ResultadoModal';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    function applyBodyOverflow(modalIsOpen: boolean) {
      document.body.style.overflowY = modalIsOpen ? 'hidden' : 'auto';
    }

    applyBodyOverflow(modalIsOpen);

    return () => {
      applyBodyOverflow(false);
    };
  }, [modalIsOpen]);

  function handleToggleOpenModal() {
    setModalIsOpen((current) => !current);
  }

  const { resultados, isLoading, isError } = useResultados();

  if (isLoading) {
    console.info('loading');
  }

  if (isError) {
    console.error('error!');
  }

  console.log(resultados);

  return (
    <>
      <main className="page">
        {Object.values(Bimestre).map((key) => (
          <BimestreSection
            bimestre={Bimestre[key]}
            openModal={handleToggleOpenModal}
            key={`bimestre-${key}`}
          />
        ))}
      </main>

      {modalIsOpen && <ResultadoModal closeModal={handleToggleOpenModal} />}
    </>
  );
}

export default App;
