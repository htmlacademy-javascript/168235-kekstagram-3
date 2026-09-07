// noUiSlider
const sliderElement = document.querySelector('.effect-level__slider');
// Поле, в котором отображается текущее значение слайдера
const sliderValueElement = document.querySelector('.effect-level__value');
// Изображение, к которому применяется эффект
const imgUploadPreview = document.querySelector('.img-upload__preview img');
//  список эффектов, которые можно применить к изображению
const effectsList = document.querySelector('.effects__list');
// контейнер слайдера, который будет скрываться при выборе эффекта "Оригинал"
const sliderContainer = document.querySelector('.img-upload__effect-level');

// Создаём слайдер с помощью noUiSlider
noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1},
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  const sliderValue = sliderElement.noUiSlider.get();
  sliderValueElement.value = sliderValue;
  if (selectedEffect === 'none') {
    sliderContainer.classList.add('hidden');
    imgUploadPreview.style.filter = '';
    sliderValueElement.value = '';
  } else if (selectedEffect === 'chrome') {
    imgUploadPreview.style.filter = `grayscale(${sliderValue})`;
    sliderContainer.classList.remove('hidden');
  } else if (selectedEffect === 'sepia') {
    imgUploadPreview.style.filter = `sepia(${sliderValue})`;
    sliderContainer.classList.remove('hidden');
  } else if (selectedEffect === 'marvin') {
    imgUploadPreview.style.filter = `invert(${sliderValue}%)`;
    sliderContainer.classList.remove('hidden');
  } else if (selectedEffect === 'phobos') {
    imgUploadPreview.style.filter = `blur(${sliderValue}px)`;
    sliderContainer.classList.remove('hidden');
  } else if (selectedEffect === 'heat') {
    imgUploadPreview.style.filter = `brightness(${sliderValue})`;
    sliderContainer.classList.remove('hidden');
  }
});

// Обработчик изменения эффекта
effectsList.addEventListener('change', () => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  switch (selectedEffect) {
    case 'none':
    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 1 },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 100 },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 3 },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 1, max: 3 },
        start: 3,
        step: 0.1,
      });
      break;
    default:
      break;
  }
});
// Функция для сброса эффектов при закрытии формы
const resetEffects = () => {
  document.querySelector('.effects__radio[value="none"]').checked = true;
  sliderElement.noUiSlider.updateOptions({
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  });
};
export {resetEffects};
