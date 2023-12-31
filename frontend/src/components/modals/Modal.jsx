import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import getModal from './index.js';
import { actions as modalActions } from '../../slices/modalSlices';

const renderModal = (modalType) => {
  if (!modalType) {
    return null;
  }
  return getModal(modalType);
};

const ModalWrap = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = modalActions;

  const { type, isShown } = useSelector((state) => state.modals);

  const ModalComponent = renderModal(type);

  return (
    <>
      <Button onClick={() => dispatch(showModal({ type: 'adding' }))} className="p-0 text-primary btn-group-vertical" variant="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="visually-hidden">+</span>
      </Button>
      <Modal show={isShown} centered onHide={() => dispatch(hideModal())}>
        {type && <ModalComponent />}
      </Modal>
    </>
  );
};

export default ModalWrap;
