import React, { Fragment, useRef, useEffect } from "react";
import "./styles/Board.css";
import Card from "./Card";

export default function Board({ level, images, addClickedCard, tryAgain }) {
  const boardRef = useRef(null);
  const getReadyRef = useRef(null);

  if (tryAgain) {
    const boardCopyRef = boardRef.current;
    const getReadyCopyRef = getReadyRef.current;
    getReadyCopyRef.style.display = "flex";
    boardCopyRef.style.display = "none";

    setTimeout(() => {
      getReadyCopyRef.style.display = "none";
      boardCopyRef.style.display = "flex";
    }, 3000);
  }

  useEffect(() => {
    const boardCopyRef = boardRef.current;
    const getReadyCopyRef = getReadyRef.current;
    setTimeout(() => {
      getReadyCopyRef.style.display = "none";
      boardCopyRef.style.display = "flex";
    }, 3000);
    return () => {
      boardCopyRef.style.display = "none";
      getReadyCopyRef.style.display = "flex";
    };
  }, [level]);

  return (
    <Fragment>
      <div ref={getReadyRef} className="getReady">
        {tryAgain
          ? "Esa última ya la habías elegido! Empezá de nuevo."
          : level === 1
          ? "Preparate para el Nivel: " + level + "..."
          : "¡Muy bien! Preparate para el Nivel: " + level + "..."}
      </div>
      <div ref={boardRef} className="board" style={{ display: "none" }}>
        {[...images].map((image, index) => {
          return (
            <Card
              key={index}
              number={index}
              card={image}
              addClickedCard={addClickedCard}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
