import { useState, useEffect } from 'react';

import { Bimestre } from '../../api/types/Resultado';

type ModalState = {
  isOpen: boolean;
  bimestre?: Bimestre;
};

// Hook personalizado para gerenciar o estado do modal
export function useResultadoModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  // Efeito para aplicar overflow no body conforme alterações no estado do modal
  useEffect(() => {
    function applyBodyOverflow(modalIsOpen: boolean) {
      // Define o overflow do body como 'hidden' se o modal estiver aberto, caso contrário, define como automático
      document.body.style.overflowY = modalIsOpen ? 'hidden' : 'auto';
    }

    // Aplica overflow no body com base no estado atual do modal
    applyBodyOverflow(modalState.isOpen);

    // Função de limpeza para redefinir overflow no body quando o componente é desmontado
    return () => {
      applyBodyOverflow(false);
    };
  }, [modalState]);

  // Função para atualizar o estado do modal com base no bimestre fornecido
  function handleModalState(bimestre?: Bimestre) {
    if (bimestre) {
      // Se o bimestre for fornecido, definir o modal como aberto com o Bimestre associado
      setModalState({
        isOpen: true,
        bimestre,
      });
    } else {
      // Se nenhum bimestre for fornecido, fechar o modal e remover o bimestre associado
      setModalState({ isOpen: false });
      delete modalState.bimestre;
    }
  }

  // Retorna o estado atual do modal e a função para atualizá-lo
  return { modalState, handleModalState };
}
