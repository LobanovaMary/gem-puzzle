import createPuzzleField from './createPuzzle.js';

(() => {
  const sizeField = document.querySelector('#size-field');
  createPuzzleField();
  sizeField.addEventListener('change', () => {
    document.querySelector('#puzzle-container').dataset.size =
      sizeField.selectedIndex + 3;
    createPuzzleField();
  });
})();
