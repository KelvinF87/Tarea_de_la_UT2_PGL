import React from "react";
import { ItemsCard } from "./ItemsCard";
import { BtnAdd } from "./BtnAdd";

export const Card = ({ data, onOpenModal, isAdmin }) => {
  const categorias = Object.keys(data.menu);

  return (
    <div className="menu-card">
      <div className="menu-card-interior">
        <h1 className="titulo-cafe">{data.cafeName}</h1>
        <p>Est. {data.established}</p>
        <hr />
        {isAdmin && <BtnAdd tipo={"add-categoria"} onOpenModal={() => onOpenModal('add-category')} />}

        {categorias.map((categoria) => (
          <ItemsCard
            key={categoria}
            data={data}
            categoria={categoria}
            onOpenModal={onOpenModal}
            isAdmin={isAdmin} // Pasar la prop
          />
        ))}

        <hr />
      </div>
    </div>
  );
};
