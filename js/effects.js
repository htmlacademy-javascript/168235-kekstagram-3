// Объект с конфигурацией для каждого эффекта
const EFFECT_OPTIONS = {
  none: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1, unit: '',
    filter: ''
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale'
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia'
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    unit: '%',
    filter: 'invert'
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur'
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness'
  }
};

// noUiSlider
const sliderElement = document.querySelector('.effect-level__slider');
// Поле, в котором отображается текущее значение слайдера
const sliderLevelElement = document.querySelector('.effect-level__value');
// Изображение, к которому применяется эффект
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
//  список эффектов, которые можно применить к изображению
const effectsListElement = document.querySelector('.effects__list');
// контейнер слайдера, который будет скрываться при выборе эффекта "Оригинал"
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

let selectedEffect = 'none';
// Создаём слайдер с помощью noUiSlider
noUiSlider.create(sliderElement, {
  range: EFFECT_OPTIONS.none.range,
  start: EFFECT_OPTIONS.none.start,
  step: EFFECT_OPTIONS.none.step,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});
// Слушатель обновления слайдера
sliderElement.noUiSlider.on('update', () => {
  const effectOptions = EFFECT_OPTIONS[selectedEffect];
  const sliderValue = Number(sliderElement.noUiSlider.get());
  if (selectedEffect === 'none') {
    sliderContainerElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = '';
    sliderLevelElement.value = '';
  } else {
    sliderContainerElement.classList.remove('hidden');
    sliderLevelElement.value = sliderValue;
    // Собираем строку фильтра динамически из названия и единицы измерения
    imgUploadPreviewElement.style.filter = `${effectOptions.filter}(${sliderValue}${effectOptions.unit})`;
  }
});

// Обработчик переключения радиокнопок
effectsListElement.addEventListener('change', (evt) => {
  selectedEffect = evt.target.value;
  const effectOptions = EFFECT_OPTIONS[selectedEffect];
  if (!effectOptions) {
    return;
  }
  sliderElement.noUiSlider.updateOptions({
    range: effectOptions.range,
    start: effectOptions.start,
    step: effectOptions.step,
  });
});

// Функция для сброса эффектов при закрытии формы
const resetEffects = () => {
  selectedEffect = 'none';
  sliderElement.noUiSlider.updateOptions({
    range: EFFECT_OPTIONS.none.range,
    start: EFFECT_OPTIONS.none.start,
    step: EFFECT_OPTIONS.none.step,
  });
};
export {resetEffects};
