import { useRef, useState, useEffect } from "react";
import "./styles/ImageSlider.css";

export default function ImageSlider({ imagesArray, imageSliderToggle }) {
  const imagesRef = useRef(null);
  const [imgShowing, setImgShowing] = useState(0);

  useEffect(() => {
    const imagesArray = getImagesArray();
    const firstImage = imagesArray[0];
    firstImage.addEventListener("load", () => {
      firstImage.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    });
  }, []);

  useEffect(() => {
    const imagesArray = getImagesArray();
    const imageNode = imagesArray[imgShowing];
    imageNode.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }, [imgShowing]);

  function getImagesArray() {
    if (!imagesRef.current) {
      // Initialize the Array on first usage.
      imagesRef.current = [];
    }
    return imagesRef.current;
  }

  function stateRight() {
    if (imgShowing === imagesArray.length - 1) {
      setImgShowing(0);
    } else {
      setImgShowing(prevState => prevState + 1);
    }
  }
  function stateLeft() {
    if (imgShowing === 0) {
      setImgShowing(imagesArray.length - 1);
    } else {
      setImgShowing(prevState => prevState - 1);
    }
  }

  return (
    <div className="imageSliderContainer">
      <button className="exit" onClick={imageSliderToggle}>
        Volver
      </button>
      <button className="left" onClick={stateLeft}>
        &lt;
      </button>
      <div className="imagesContainer">
        <div className="images">
          {imagesArray.map((image, index) => {
            return (
              <img
                key={image}
                ref={node => {
                  const imagesArray = getImagesArray();
                  if (node) {
                    imagesArray[index] = node;
                  } else {
                    imagesArray[index] = null;
                  }
                }}
                src={image}
                alt={"image#" + index}
              />
            );
          })}
        </div>
      </div>
      <button className="right" onClick={stateRight}>
        &gt;
      </button>
      <div className="thumbnails">
        {imagesArray.map((image, index) => {
          return (
            <img
              key={`thumbnail${image}`}
              src={image}
              alt={"thumbnail#" + index}
              className={
                imgShowing === index ? "thumbnail showing" : "thumbnail"
              }
              onClick={() => {
                setImgShowing(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
