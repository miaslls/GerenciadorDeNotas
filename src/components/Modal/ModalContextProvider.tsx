import React, { createContext, useContext, useEffect, useState } from 'react';

import { Bimestre } from '../../api/types/Resultado';

type ModalState = {
  isOpen: boolean;
  bimestre?: Bimestre;
};

type ModalContextValue = {
  modalState: ModalState;
  handleModalState(bimestre?: Bimestre): void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      'useModal must be used within a component wrapped with ModalContextProvider. ' +
        'Wrap your component tree with <ModalContextProvider> to enable modal functionality.'
    );
  }

  return context;
}

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <ModalContext.Provider value={{ modalState, handleModalState }}>
      {children}
    </ModalContext.Provider>
  );
}
