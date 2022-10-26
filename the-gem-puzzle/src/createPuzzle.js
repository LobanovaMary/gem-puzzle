const createPuzzleField = () => {
  const puzzleContainer = document.querySelector('#puzzle-container');
  const shuffleStart = document.querySelector('#shuffle-start');
  const moves = document.querySelector('.result__moves-counter');
  const audio = new Audio('./assets/sound.mp3');
  const size = Number(puzzleContainer.dataset.size);
  const time = document.querySelector('.result__time-counter');

  let timerCounter;
  let seconds = 0;
  let countMove = 0;
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
      puzzleContainer.innerHTML += `<div class="puzzle-item" style = "width: ${sizePuzzleItem}px; height: ${sizePuzzleItem}px; top: ${puzzleItem.y}px; left: ${puzzleItem.x}px;" data-pos="${puzzleItem.position}">${puzzleItem.value}</div>`;
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

  function getTargetPuzzle(targetPos) {
    return puzzle.find((item) => item.position === targetPos);
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
    countMove++;
  }

  function timer() {
    seconds++;

    time.innerHTML = `${String(Math.floor(seconds / 60)).padStart(
      2,
      '0'
    )} : ${String(seconds % 60).padStart(2, '0')}`;
  }

  function movePuzzleItem(e) {
    try {
      if (e.target.closest('.puzzle-item') != null) {
        const targetPos = Number(e.target.closest('.puzzle-item').dataset.pos);

        const emptySpace = getEmptyPuzzle();
        const posEmptySpace = emptySpace.position;
        if (
          targetPos === posEmptySpace - 1 ||
          targetPos === posEmptySpace + 1 ||
          targetPos === posEmptySpace + size ||
          targetPos === posEmptySpace - size
        ) {
          const targetItem = getTargetPuzzle(targetPos);
          let isX = true;
          if (targetItem.x === emptySpace.x) isX = false;
          audio.currentTime = 0;

          swapPositions(targetItem, emptySpace, isX);
          renderPuzzle();
          timerCounter = setInterval(timer, 1000);
          audio.play();
          moves.innerHTML = countMove;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function newGame() {
    puzzle = [];
    generatePuzzle();
    randomizePuzzle();
    renderPuzzle();
    clearInterval(timerCounter);
    time.innerHTML = `00 : 00`;
    seconds = 0;
    countMove = 0;
    moves.innerHTML = countMove;
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
