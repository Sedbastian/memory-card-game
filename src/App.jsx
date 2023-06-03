import React, { Fragment, useState, useRef } from "react";
import "./App.css";
import { randomElements, shuffle } from "./arrayFunctions";
import Score from "./components/Score";
import Messages from "./components/Messages";
import Board from "./components/Board";
import WinMessage from "./components/WinMessage";
import ImageSlider from "./components/ImageSlider";
import GithubSvg from "./components/GithubSvg";

function App() {
  const path = require.context("./components/images", false, /\.jpg$/);
  const images = path.keys().map(path);
  const imagesAddedPerLevel = 3;
  const lastLevel = 1;
  // const lastLevel = Math.floor(images.length / imagesAddedPerLevel);
  const [levelImages, setLevelImages] = useState(
    randomElements(images, imagesAddedPerLevel)
  );

  const [level, setLevel] = useState(1);
  const [levelScore, setLevelScore] = useState(0);

  const highestLevel = localStorage.getItem("highestLevel");
  const highestLevelScore = localStorage.getItem("highestLevelScore");

  let initialHighScores = { level: 0, levelScore: 0 };

  if (highestLevel !== null && highestLevel !== "") {
    initialHighScores.level = highestLevel;
  }
  if (highestLevelScore !== null && highestLevelScore !== "") {
    initialHighScores.levelScore = highestLevelScore;
  }

  const [highScore, setHighScore] = useState(initialHighScores);

  const tryAgainRef = useRef(false);
  const newLevelRef = useRef(true);

  const clickedCards = useRef([]);

  const [imageSliderShowing, setImageSliderShowing] = useState(false);
  function imageSliderToggle() {
    setImageSliderShowing(prevState => !prevState);
  }

  function addClickedCard(src) {
    if (clickedCards.current.includes(src)) {
      clickedCards.current = [];
      loseNreset();
      setLevelImages(shuffle(levelImages, []));
    } else if (levelScore + 1 === level * imagesAddedPerLevel) {
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
    if (level >= highScore.level && levelScore + 1 > highScore.levelScore) {
      setHighScore({ level: level, levelScore: levelScore + 1 });
      localStorage.setItem("highestLevelScore", levelScore + 1);
    }
  }

  function loseNreset() {
    tryAgainRef.current = true;
    newLevelRef.current = false;
    setLevelScore(0);
    clickedCards.current = [];
  }

  function levelCompleted() {
    setLevelScore(0);
    setLevel(level + 1);
    if (level + 1 > highScore.level) {
      setHighScore({ level: level + 1, levelScore: 0 });
      localStorage.setItem("highestLevel", level + 1);
      localStorage.setItem("highestLevelScore", 0);
    }
    newLevelRef.current = true;
    if (level + 1 <= lastLevel) {
      setLevelImages(randomElements(images, (level + 1) * imagesAddedPerLevel));
    }
  }

  function resetHighScore() {
    setHighScore({ level: 0, levelScore: 0 });
    localStorage.setItem("highestLevel", "0");
    localStorage.setItem("highestLevelScore", "0");
  }

  function startOver() {
    setLevel(1);
    setLevelImages(randomElements(images, 1 * imagesAddedPerLevel));
  }

  return (
    <Fragment>
      {imageSliderShowing && (
        <ImageSlider
          imagesArray={images}
          imageSliderToggle={imageSliderToggle}
        />
      )}
      <header>
        <div className="memoryHeader">Memory</div>
        <div className="cardHeader">Card</div>
        <div className="gameHeader">Game</div>
      </header>
      <button
        className="imageSlider"
        onClick={() => setImageSliderShowing(true)}
      >
        Ver Imágenes
      </button>
      <Score
        level={level}
        levelScore={levelScore}
        highScore={highScore}
        resetHighScore={resetHighScore}
      />
      <main>
        {level < lastLevel + 1 ? (
          <Fragment>
            <Messages
              level={level}
              levelScore={levelScore}
              tryAgain={tryAgainRef.current}
              newLevel={newLevelRef.current}
            />
            <Board
              levelScore={levelScore}
              level={level}
              images={[...levelImages]}
              addClickedCard={addClickedCard}
              addScore={addScore}
              tryAgain={tryAgainRef.current}
              levelCompleted={levelCompleted}
            />
          </Fragment>
        ) : null}

        {level === lastLevel + 1 ? (
          <WinMessage
            startOver={startOver}
            images={images}
            imageSliderToggle={imageSliderToggle}
          />
        ) : null}
      </main>
      <footer>
        <a href="https://github.com/Sedbastian" className="sedbastian">
          Sedbastian
        </a>
        <a
          href="https://github.com/Sedbastian/memory-card-game"
          className="github"
        >
          <GithubSvg />
        </a>
        <div className="year">2023</div>
      </footer>
    </Fragment>
  );
}

export default App;
