import React from 'react';
export const Card = ({ data }) => {
  return (
    <div className="menu-card">
      <div className="menu-card-interior">
        <h1 className="titulo-cafe">{data.cafeName}</h1>
        <p>Est. {data.established}</p>
        <hr />

        <h2>Coffee</h2>
        <img src={data.imgCoffe} alt="Coffee icon" />
  
        {data.menu.coffee.map((item) => (
          <div className="menu-item" key={item.name}>
            <span>{item.name}</span>
            <span>{item.price.toFixed(2)} €</span>
          </div>
        ))}

        <h2>Desserts</h2>
        <img src={data.imgDessert} alt="Dessert icon" />
    
        {data.menu.desserts.map((item) => (
          <div className="menu-item" key={item.name}>
            <span>{item.name}</span>
            <span>{item.price.toFixed(2)} €</span>
          </div>
        ))}
        
        <hr />

        <footer>
          <p>        
            <a href="#">{data.contact.website}</a>
          </p>
          <p>{data.contact.address}</p>
        </footer>
      </div>
    </div>
  );
};