import React from "react";
import './BtnAdd.css';

export const BtnAdd = ({ tipo, onOpenModal }) => {
  const buttonConfig = {
    'add-categoria': { text: '➕ Add Category', className: 'btnAdd btnAdd-categoria' },
    'add-plato': { text: '➕ Add Item', className: 'btnAdd btnAdd-item' },
    'edit-plato': { text: '✏️', className: 'btn-icon btnEdit-item' },
    'delete-plato': { text: '🗑️', className: 'btn-icon btnDelete-item' },
    'edit-categoria': { text: '✏️', className: 'btn-icon btnEdit-categoria' },
    'delete-categoria': { text: '🗑️', className: 'btn-icon btnDelete-categoria' },
  };

  const config = buttonConfig[tipo];

  if (!config) {
    return null;
  }

  return (
    <button onClick={onOpenModal} className={config.className} title={config.text}>
      {config.text}
    </button>
  );
};
