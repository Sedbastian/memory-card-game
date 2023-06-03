import React, { useEffect, useRef } from "react";
import "./styles/Card.css";

export default function Card({ card, addClickedCard }) {
  const cardRef = useRef(null);
  useEffect(() => {
    const ref = cardRef.current;
    function removeEffectClass() {
      ref.classList.remove("turn");
    }
    ref.addEventListener("animationend", removeEffectClass);
    ref.classList.add("turn");

    return () => {
      ref.removeEventListener("animationend", removeEffectClass);
      ref.classList.remove("turn");
    };
  });

  return (
    <img
      ref={cardRef}
      className="card"
      alt="Van Gogh"
      src={card}
      onClick={e => {
        addClickedCard(e.target.src);
      }}
    />
  );
}
