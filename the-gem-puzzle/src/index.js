import createPuzzleField from './createPuzzle.js';

(() => {
  const sizeField = document.querySelector('#size-field');
  createPuzzleField(sizeField.value);

  sizeField.addEventListener('change', () =>
    createPuzzleField(sizeField.value)
  );
})();
