function randomElements(array, quantity) {
  let randomIndex;
  const usedIndexes = [];

  const newArray = [];

  for (let i = 0; i < quantity; i++) {
    do {
      randomIndex = Math.floor(Math.random() * array.length);
    } while (usedIndexes.includes(randomIndex));
    usedIndexes.push(randomIndex);
    newArray.push(array[randomIndex]);
  }
  return newArray;
}

function shuffle(array, shuffledElems) {
  if (array.length === 0) {
    return shuffledElems;
  }
  let randomIndex = Math.floor(Math.random() * array.length);
  shuffledElems.push(array[randomIndex]);
  array.splice(randomIndex, 1);
  return shuffle(array, shuffledElems);
}

export { randomElements, shuffle };
