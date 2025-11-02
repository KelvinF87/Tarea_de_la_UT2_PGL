import React from "react";
import { BtnAdd } from "./BtnAdd";
import category from '../assets/category_resized.png';

export const ItemsCard = ({ data, categoria, onOpenModal }) => {
  const listaItems = data.menu[categoria];

  let imagenSrc;
  if (categoria === 'coffee') {
    imagenSrc = data.imgCoffe;
  } else if (categoria === 'desserts') {
    imagenSrc = data.imgDessert;
  } else {
    imagenSrc = category;
  }

  return (
    <div className="category-section">
      <div className="category-header">
        <h2>{categoria.toUpperCase()}</h2>
        <div className="category-controls">
           <BtnAdd tipo="edit-categoria" onOpenModal={() => onOpenModal('edit-category', { categoryName: categoria })} />
           <BtnAdd tipo="delete-categoria" onOpenModal={() => onOpenModal('delete-category', { categoryName: categoria })} />
        </div>
      </div>

      <img src={imagenSrc} alt={`${categoria} icon`} />

      {listaItems.map((item) => (
        <div className="menu-item" key={item.name}>
          <span>{item.name}</span>
          <div className="item-controls">
            <span>{item.price.toFixed(2)} €</span>
            <BtnAdd tipo="edit-plato" onOpenModal={() => onOpenModal('edit-item', { categoryName: categoria, item })} />
            <BtnAdd tipo="delete-plato" onOpenModal={() => onOpenModal('delete-item', { categoryName: categoria, item })} />
          </div>
        </div>
      ))}
      <div className="add-item-container">
        <BtnAdd tipo="add-plato" onOpenModal={() => onOpenModal('add-item', { categoryName: categoria })} />
      </div>
    </div>
  );
};