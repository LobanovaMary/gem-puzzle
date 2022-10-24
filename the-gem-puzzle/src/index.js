import createPuzzleField from './createPuzzle.js';

(() => {
  alert(
    'Здрайвствуйте, это моя первая работа. Проверте, пожалуйста, в четверг. Я буду еще доделовать'
  );
  const sizeField = document.querySelector('#size-field');
  createPuzzleField(sizeField.value);

  sizeField.addEventListener('input', () => createPuzzleField(sizeField.value));
})();
