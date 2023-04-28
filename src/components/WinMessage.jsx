import React, { useRef, useEffect } from "react";
import "./styles/WinMessage.css";

export default function WinMessage({ startOver, imageSliderToggle }) {
  const winMessageRef = useRef(null);
  const startOverRef = useRef(null);
  const imageSliderRef = useRef(null);

  useEffect(() => {
    const winRef = winMessageRef.current;
    const startRef = startOverRef.current;
    const sliderRef = imageSliderRef.current;

    setTimeout(() => {
      winRef.classList.add("trans");
      winRef.addEventListener("transitionend", () => {
        startRef.classList.add("trans");
        startRef.addEventListener("transitionend", () => {
          sliderRef.classList.add("trans");
        });
      });
    }, 0);
    return () => {
      winRef.classList.remove("trans");
      startRef.classList.remove("trans");
      sliderRef.classList.remove("trans");
    };
  });

  return (
    <div className="winMessageContainer">
      <div ref={winMessageRef} className="winMessage">
        ¡Ganaste! ¡Pasaste todos los niveles!
      </div>
      <button ref={startOverRef} onClick={startOver} className="startOver">
        Empezar de nuevo
      </button>
      <button
        ref={imageSliderRef}
        className="imageSlider"
        onClick={imageSliderToggle}
      >
        Ver las imágenes en mayor resolución
      </button>
    </div>
  );
}
