const createPuzzleField = (sizeField) => {
  const size = Number(sizeField);
  const puzzleContainer = document.querySelector('#puzzle-container');
  const shuffleStart = document.querySelector('#shuffle-start');
  let widthPuzzleContainerr = puzzleContainer.offsetWidth;
  let sizePuzzleItem = widthPuzzleContainerr / size;
  let puzzle = [];

  function getRow(pos) {
    return Math.ceil(pos / size);
  }

  function getCol(pos) {
    const col = pos % size;
    if (col === 0) {
      return size;
    }
    return col;
  }

  function generatePuzzle() {
    widthPuzzleContainerr = puzzleContainer.offsetWidth;
    sizePuzzleItem = widthPuzzleContainerr / size;
    if (puzzle.length === 0) {
      for (let i = 1; i <= size * size; i++) {
        puzzle.push({
          value: i,
          position: i,
          x: (getCol(i) - 1) * sizePuzzleItem,
          y: (getRow(i) - 1) * sizePuzzleItem,
          disabled: false,
        });
      }
    } else {
      puzzle.map((item, i) => {
        item.x = (getCol(i + 1) - 1) * sizePuzzleItem;
        item.y = (getRow(i + 1) - 1) * sizePuzzleItem;
      });
    }
  }

  function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    for (let puzzleItem of puzzle) {
      if (puzzleItem.disabled) continue;
      puzzleContainer.innerHTML += `<div class="puzzle-item" style = "width: ${sizePuzzleItem}px; height: ${sizePuzzleItem}px; top: ${puzzleItem.y}px; left: ${puzzleItem.x}px;">${puzzleItem.value}</div>`;
    }
  }

  function getRandomValues() {
    const values = [];
    for (let i = 1; i <= puzzle.length; i++) {
      values.push(i);
    }
    const randomValues = values.sort(() => Math.random() - 0.5);
    return randomValues;
  }

  function randomizePuzzle() {
    const randomValues = getRandomValues();
    for (let i = 0; i < puzzle.length; i++) {
      puzzle[i].value = randomValues[i];
    }

    const puzzleWithValueOf9 = puzzle.find(
      (item) => item.value === size * size
    );
    puzzleWithValueOf9.disabled = true;
  }

  function getEmptyPuzzle() {
    return puzzle.find((item) => item.disabled);
  }

  function getTargetPuzzle(targetValue) {
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i].value === targetValue) {
        return puzzle[i];
      }
    }
  }

  function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
    // position swapping
    let temp = firstPuzzle.position;
    firstPuzzle.position = secondPuzzle.position;
    secondPuzzle.position = temp;

    // x position swapping

    if (isX) {
      temp = firstPuzzle.x;
      firstPuzzle.x = secondPuzzle.x;
      secondPuzzle.x = temp;
    } else {
      // must be y
      temp = firstPuzzle.y;
      firstPuzzle.y = secondPuzzle.y;
      secondPuzzle.y = temp;
    }
  }

  function movePuzzleItem(e) {
    const targetValue = Number(e.target.innerHTML);
    const targetItem = getTargetPuzzle(targetValue);
    if (targetItem) {
      const posTargetItem = targetItem?.position;
      const emptySpace = getEmptyPuzzle();
      const posEmptySpace = emptySpace.position;
      console.log(`targetValue: ${targetValue}  targetItem: ${targetItem}`);
      console.log(`posTargetItem: ${posTargetItem}`);
      console.log(`emptySpace: ${emptySpace}  posEmptySpace: ${posEmptySpace}`);

      if (
        posTargetItem === posEmptySpace - 1 ||
        posTargetItem === posEmptySpace + 1 ||
        posTargetItem === posEmptySpace + size ||
        posTargetItem === posEmptySpace - size
      ) {
        let isX = true;
        if (targetItem.x === emptySpace.x) isX = false;
        swapPositions(targetItem, emptySpace, isX);
        renderPuzzle();
      }
    }
  }

  function newGame() {
    console.log(' Hi im new game');
    puzzle = [];
    generatePuzzle();
    randomizePuzzle();
    renderPuzzle();
  }

  puzzleContainer.addEventListener('click', movePuzzleItem);
  shuffleStart.addEventListener('click', newGame);

  function getSmallResolution() {
    if (window.innerWidth <= 680) {
      generatePuzzle();
      renderPuzzle();
      window.removeEventListener('resize', getSmallResolution);
      window.addEventListener('resize', getLargeResolution);
    }
  }

  function getLargeResolution() {
    if (window.innerWidth >= 680) {
      generatePuzzle();
      renderPuzzle();
      window.removeEventListener('resize', getLargeResolution);
      window.addEventListener('resize', getSmallResolution);
    }
  }

  (function init() {
    console.log('Im start');
    generatePuzzle();
    randomizePuzzle();
    renderPuzzle();
    if (window.innerWidth >= 680) {
      window.addEventListener('resize', getSmallResolution);
    } else {
      window.addEventListener('resize', getLargeResolution);
    }
  })();
};

export default createPuzzleField;
