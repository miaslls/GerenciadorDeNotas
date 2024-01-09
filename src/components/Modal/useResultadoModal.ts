import { useState, useEffect } from 'react';

import { Bimestre } from '../../api/types/Resultado';

type ModalState = {
  isOpen: boolean;
  bimestre?: Bimestre;
};

export function useResultadoModal() {
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
  }, [modalState]);

  function handleModalState(bimestre?: Bimestre) {
    if (bimestre) {
      setModalState({
        isOpen: true,
        bimestre,
      });
    } else {
      setModalState({ isOpen: false });
      delete modalState.bimestre;
    }
  }

  return { modalState, handleModalState };
}
