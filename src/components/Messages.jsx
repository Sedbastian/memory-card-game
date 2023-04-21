import React, { useRef, useEffect } from "react";
import "./styles/Messages.css";

export default function Messages({ level, levelScore, tryAgain, newLevel }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    const messagesCopyRef = messagesRef.current;
    const timeoutId = setTimeout(
      () => {
        messagesCopyRef.style.opacity = "1";
      },
      tryAgain || newLevel ? 6000 : 4500
    );
    return () => {
      messagesCopyRef.style.opacity = "0";
      clearTimeout(timeoutId);
    };
  });

  return (
    <div ref={messagesRef} className="messages" style={{ opacity: "0" }}>
      {level === 1 && levelScore === 0
        ? "Elegí una de estas " + level * 3 + " imágenes:"
        : level * 3 > levelScore + 1
        ? "Elegí una imagen de las " +
          (level * 3 - levelScore) +
          " que todavia no clickeaste:"
        : "Bien! Sólo te falta una que todavía no elegiste para pasar al siguiente nivel!"}
    </div>
  );
}
