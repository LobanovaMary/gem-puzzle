import createPuzzleField from './createPuzzle.js';

(() => {
  alert(
    'Здрайвствуйте, это моя первая работа. Проверте, пожалуйста, в четверг. Я буду еще доделовать'
  );
  const sizeField = document.querySelector('#size-field');

  createPuzzleField();
  sizeField.addEventListener('change', () => {
    document.querySelector('#puzzle-container').dataset.size =
      sizeField.selectedIndex + 3;
    createPuzzleField();
  });
})();
