import React, { useRef, useEffect } from "react";
import "./styles/Board.css";
import Card from "./Card";

export default function Board({ level, images, addClickedCard, oneImageLoaded }) {
  const boardRef = useRef(null);
  useEffect(() => {
    console.log("effect");
    const ref = boardRef.current;
    setTimeout(() => {
      ref.style.display = "block";
    }, 400);
    return () => {
      ref.style.display = "none";
    };
  }, [level]);
  return (
    <div ref={boardRef} className="board" style={{ display: "none" }}>
      {[...images].map((image, index) => {
        return (
          <Card
            key={index}
            number={index}
            card={image}
            addClickedCard={addClickedCard}
            oneImageLoaded={oneImageLoaded}
          />
        );
      })}
    </div>
  );
}
