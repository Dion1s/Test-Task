import React from 'react';
import './Modal.css';
import { ModalProps } from '../../types/modalProps';

// Modal Component - Responsible for rendering a modal dialog with overlay and close functionality
const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;