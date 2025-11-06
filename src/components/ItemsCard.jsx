import React from "react";
import { BtnAdd } from "./BtnAdd";
import category from '../assets/category_resized.png';

export const ItemsCard = ({ data, categoria, onOpenModal, isAdmin }) => {
  const categoriaData = data.menu[categoria];
  if (!categoriaData) {
    return null;
  }
  const listaItems = isAdmin ? categoriaData.items : categoriaData;
  const categoryId = isAdmin ? categoriaData.id : null;
  if (!Array.isArray(listaItems)) {
    return null;
  }
  const imageMap = {
    'coffee': data.imgCoffe,
    'desserts': data.imgDessert,
    'postres': data.imgDessert,
    'bebidas': category,
    'entrantes': category,
    'platos principales': category,
  };
  const imagenSrc = imageMap[categoria.toLowerCase()] || category;

  return (
    <div className="category-section">
      <div className="category-header">
        <h2>{categoria.toUpperCase()}</h2>
        {isAdmin && (
          <div className="category-controls">
             <BtnAdd tipo="edit-categoria" onOpenModal={() => onOpenModal('edit-category', { categoryId, categoryName: categoria })} />
             <BtnAdd tipo="delete-categoria" onOpenModal={() => onOpenModal('delete-category', { categoryId, categoryName: categoria })} />
          </div>
        )}
      </div>

      <img src={imagenSrc} alt={`${categoria} icon`} />

      {listaItems.map((item) => (
        <div className="menu-item" key={item.id || item.nombre}>
          <span>{item.nombre}</span>
          <div className="item-controls">
            <span>{Number(item.precio).toFixed(2)} €</span>
            {isAdmin && (
              <>
                <BtnAdd tipo="edit-plato" onOpenModal={() => onOpenModal('edit-item', { item })} />
                <BtnAdd tipo="delete-plato" onOpenModal={() => onOpenModal('delete-item', { item })} />
              </>
            )}
          </div>
        </div>
      ))}
      {isAdmin && (
        <div className="add-item-container">
          <BtnAdd tipo="add-plato" onOpenModal={() => onOpenModal('add-item', { categoryId })} />
        </div>
      )}
    </div>
  );
};