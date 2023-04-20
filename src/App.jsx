import React, { Fragment, useState, useRef } from "react";
import "./App.css";
import { randomElements, shuffle } from "./arrayFunctions";
import Score from "./components/Score";
import Messages from "./components/Messages";
import Board from "./components/Board";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

function App() {
  const path = require.context("./components/images", false, /\.jpg$/);
  const images = path.keys().map(path);

  const [level, setLevel] = useState(1);
  const [levelScore, setLevelScore] = useState(0);
  const [highScore, setHighScore] = useState({ level: 0, levelScore: 0 });
  const [levelImages, setLevelImages] = useState(randomElements(images, 3));
  const tryAgainRef = useRef(false);
  const newLevelRef = useRef(true);
  // const nImagesLoaded = useRef(0);

  const clickedCards = useRef([]);

  // function oneImageLoaded() {
  //   nImagesLoaded.current = nImagesLoaded.current + 1;
  //   if (nImagesLoaded.current === levelImages.length) {
  //     // setBoardStatus("showing");
  //     nImagesLoaded.current = 0;
  //   }
  // }

  function addClickedCard(src) {
    if (clickedCards.current.includes(src)) {
      clickedCards.current = [];
      loseNreset();
      setLevelImages(shuffle(levelImages, []));
    } else if (levelScore + 1 === level * 3) {
      tryAgainRef.current = false;
      clickedCards.current = [];
      levelCompleted();
    } else {
      tryAgainRef.current = false;
      addScore();
      clickedCards.current = clickedCards.current.concat(src);
      setLevelImages(shuffle([...levelImages], []));
    }
  }

  function addScore() {
    newLevelRef.current = false;
    setLevelScore(levelScore + 1);
    if (levelScore + 1 > highScore.levelScore) {
      setHighScore({ level: level, levelScore: levelScore + 1 });
    }
  }

  function loseNreset() {
    tryAgainRef.current = true;
    newLevelRef.current = false;
    setLevelScore(0);
    clickedCards.current = [];
  }

  function levelCompleted() {
    setLevelImages(randomElements(images, (level + 1) * 3));
    setLevelScore(0);
    if (level + 1 > highScore.level) {
      setHighScore({ level: level + 1, levelScore: 0 });
    }
    newLevelRef.current = true;
    setLevel(level + 1);
  }

  return (
    <Fragment>
      <header>
        <div className="container">
          <div className="title">
            <div className="memoryHeader">Memory</div>
            <div className="cardHeader">Card</div>
            <div className="gameHeader">Game</div>
          </div>
          <Score level={level} levelScore={levelScore} highScore={highScore} />
        </div>
      </header>
      <main>
        <Messages
          level={level}
          levelScore={levelScore}
          tryAgain={tryAgainRef.current}
          newLevel={newLevelRef.current}
        />
        <Board
          level={level}
          images={[...levelImages]}
          // oneImageLoaded={oneImageLoaded}
          levelScore={levelScore}
          addClickedCard={addClickedCard}
          addScore={addScore}
          tryAgain={tryAgainRef.current}
          levelCompleted={levelCompleted}
        />
      </main>
      <footer className="footerTag">
        <a href="https://github.com/Sedbastian">
          Sedbastian
          {/* <FontAwesomeIcon icon={faGithub} /> */}
        </a>
        &nbsp;2023
      </footer>
    </Fragment>
  );
}

export default App;
