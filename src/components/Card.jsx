import React from "react";
import "./styles/Card.css";

export default function Card({ card, addClickedCard }) {
  return (
    <img
      className="card"
      alt="Van Gogh"
      src={card}
      onClick={e => {
        addClickedCard(e.target.src);
      }}
    />
  );
}
