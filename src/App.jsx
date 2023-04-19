import React, { Fragment, useState, useRef } from "react";
import "./App.css";
import { randomElements, shuffle } from "./arrayFunctions";
import Score from "./components/Score";
import Board from "./components/Board";

function App() {
  const path = require.context("./components/images", false, /\.jpg$/);
  const images = path.keys().map(path);

  const [level, setLevel] = useState(1);
  const [levelScore, setLevelScore] = useState(0);
  const [highScore, setHighScore] = useState({ level: 0, levelScore: 0 });
  const [levelImages, setLevelImages] = useState(randomElements(images, 3));
  const nImagesLoaded = useRef(0);
  const [boardStatus, setBoardStatus] = useState("hidden");

  const clickedCards = useRef([]);

  function oneImageLoaded() {
    nImagesLoaded.current = nImagesLoaded.current + 1;
    if (nImagesLoaded.current === levelImages.length) {
      setBoardStatus("showing");
      nImagesLoaded.current = 0;
    }
  }

  function addClickedCard(src) {
    if (clickedCards.current.includes(src)) {
      clickedCards.current = [];
      loseNreset();
      setLevelImages(shuffle(levelImages, []));
    } else {
      if (levelScore + 1 === level * 3) {
        addScore();
        clickedCards.current = [];
        levelCompleted();
        return;
      }
      addScore();
      clickedCards.current = clickedCards.current.concat(src);
      setLevelImages(shuffle([...levelImages], []));
    }
  }

  function addScore() {
    setLevelScore(levelScore + 1);
    if (levelScore + 1 > highScore.levelScore) {
      setHighScore({ level: level, levelScore: levelScore + 1 });
    }
  }

  function loseNreset() {
    setLevelScore(0);
    clickedCards.current = [];
  }

  function levelCompleted() {
    alert(`Nivel ${level} completado!`);
    setLevelImages(randomElements(images, (level + 1) * 3));
    setLevelScore(0);
    setLevel(level + 1);
  }

  return (
    <Fragment>
      <header>header</header>
      <main>
        <Score level={level} levelScore={levelScore} highScore={highScore} />
        <Board
          level={level}
          images={[...levelImages]}
          oneImageLoaded={oneImageLoaded}
          boardStatus={boardStatus}
          levelScore={levelScore}
          addClickedCard={addClickedCard}
          addScore={addScore}
          loseNreset={loseNreset}
          levelCompleted={levelCompleted}
        />
      </main>
      <footer>footer</footer>
    </Fragment>
  );
}

export default App;
