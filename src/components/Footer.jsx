import React from "react";

export const Footer = ({ midata }) => {
  return (
    <footer>
      <p>
        <a href="#">{midata.contact.website}</a>
      </p>
      <p>{midata.contact.address}</p>
    </footer>
  );
};
