import React, { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ src, alt, handleClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

export default Modal;
