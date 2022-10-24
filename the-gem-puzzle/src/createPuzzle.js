const createPuzzleField = (size) => {
  const puzzleContainer = document.querySelector('#puzzle-container');
  const widthPuzzleContainerr = puzzleContainer.offsetWidth;
  const sizePuzzleItem = widthPuzzleContainerr / size;
  const puzzle = [];

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
    for (let i = 1; i <= size * size; i++) {
      puzzle.push({
        value: i,
        position: i,
        x: (getCol(i) - 1) * sizePuzzleItem,
        y: (getRow(i) - 1) * sizePuzzleItem,
        disabled: false,
      });
    }
  }

  function renderPuzzle() {
    console.log(puzzle);
    puzzleContainer.innerHTML = '';
    for (let puzzleItem of puzzle) {
      if (puzzleItem.disabled) continue;
      puzzleContainer.innerHTML += `<div class="puzzle-item" style = "width: ${sizePuzzleItem}px; height: ${sizePuzzleItem}px; top: ${puzzleItem.y}px; left: ${puzzleItem.x}px;">
        ${puzzleItem.value}
        </div>`;
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

  generatePuzzle();
  randomizePuzzle();
  renderPuzzle();

  function getEmptyPuzzle() {
    return puzzle.find((item) => item.disabled);
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
    const targetItem = puzzle.find(
      (item) => item.value === Number(e.target.innerHTML)
    );

    console.log(targetItem);
    const posTargetItem = targetItem.position;

    const emptySpace = getEmptyPuzzle();
    const posEmptySpace = emptySpace.position;
    if (
      posTargetItem === posEmptySpace - 1 ||
      posTargetItem === posEmptySpace + 1 ||
      posTargetItem === posEmptySpace - size ||
      posTargetItem === posEmptySpace + size
    ) {
      let isX = true;
      if (targetItem.x === emptySpace.x) isX = false;
      swapPositions(targetItem, emptySpace, isX);
      renderPuzzle();
    }
  }

  puzzleContainer.addEventListener('click', movePuzzleItem);
};

export default createPuzzleField;
