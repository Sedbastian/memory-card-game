import React from "react";
import "./styles/Card.css";

export default function Card({ card, addClickedCard, oneImageLoaded }) {
  function onClick(e) {
    addClickedCard(e.target.src);
  }

  function onLoad() {
    oneImageLoaded();
  }

  return (
    <img
      className="card"
      alt="Van Gogh"
      src={card}
      onLoad={onLoad}
      onClick={onClick}
    />
  );
}
