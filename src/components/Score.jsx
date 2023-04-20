import React, { Fragment, useEffect, useRef } from "react";
import "./styles/Score.css";

export default function Score({ level, levelScore, highScore }) {
  const scoreRef = useRef(null);
  const levelRef = useRef(null);
  const highScoreLevelScoreRef = useRef(null);
  const highScoreLevelRef = useRef(null);

  useEffect(() => {
    const ref = scoreRef.current;
    function removeEffectClass() {
      ref.classList.remove("effect");
    }
    ref.addEventListener("transitionend", removeEffectClass);
    ref.classList.add("effect");
    return () => {
      ref.removeEventListener("transitionend", removeEffectClass);
    };
  }, [levelScore]);

  useEffect(() => {
    const ref = levelRef.current;
    function removeEffectClass() {
      ref.classList.remove("effect");
    }
    ref.addEventListener("transitionend", removeEffectClass);
    ref.classList.add("effect");
    return () => {
      ref.removeEventListener("transitionend", removeEffectClass);
    };
  }, [level]);

  useEffect(() => {
    const ref = highScoreLevelScoreRef.current;
    function removeEffectClass() {
      ref.classList.remove("effect");
    }
    ref.addEventListener("transitionend", removeEffectClass);
    ref.classList.add("effect");
    return () => {
      ref.removeEventListener("transitionend", removeEffectClass);
    };
  }, [highScore.levelScore]);

  useEffect(() => {
    const ref = highScoreLevelRef.current;
    function removeEffectClass() {
      ref.classList.remove("effect");
    }
    ref.addEventListener("transitionend", removeEffectClass);
    ref.classList.add("effect");
    return () => {
      ref.removeEventListener("transitionend", removeEffectClass);
    };
  }, [highScore.level]);

  return (
    <Fragment>
      <div className="score">
        <div className="scoreTitle">Puntaje:</div>
        <div className="level">
          Nivel:{" "}
          <div ref={levelRef} className="effectable">
            {level}
          </div>
        </div>
        <div className="levelScore">
          Imágenes sin repetir:{" "}
          <div ref={scoreRef} className="effectable">
            {levelScore}
          </div>
        </div>
      </div>
      <div className="highScore">
        <div className="record">Record:</div>
        <div className="level">
          Nivel:{" "}
          <div ref={highScoreLevelRef} className="effectable">
            {highScore.level}
          </div>
        </div>
        <div className="levelScore">
          Imágenes sin repetir:{" "}
          <div ref={highScoreLevelScoreRef} className="effectable">
            {highScore.levelScore}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
