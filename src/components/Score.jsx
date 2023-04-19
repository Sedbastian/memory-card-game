import React from "react";
import "./styles/Score.css";

export default function Score({ level, levelScore, highScore }) {
  return (
    <div className="score">
      <div className="levelScore">
        <div>Puntaje:</div>
        <div>Nivel: {level}</div>
        Puntaje del nivel: {levelScore}
      </div>
      <div className="highScore">
        <div>Record:</div>
        <div>Nivel: {highScore.level}</div>
        <div>Puntaje del nivel: {highScore.levelScore}</div>
      </div>
    </div>
  );
}
