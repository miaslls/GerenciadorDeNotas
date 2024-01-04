import './styles/global.css';

import { Bimestre } from './api/types/Resultado';
import BimestreSection from './components/BimestreSection';
import ResultadoModal from './components/ResultadoModal';

function App() {
  return (
    <>
      <main className="page">
        {Object.values(Bimestre).map((key) => (
          <BimestreSection bimestre={Bimestre[key]} key={`bimestre-${key}`} />
        ))}
      </main>

      <ResultadoModal />
    </>
  );
}

export default App;
