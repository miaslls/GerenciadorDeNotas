import './styles/global.css';

import { Tooltip } from 'react-tooltip';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
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
