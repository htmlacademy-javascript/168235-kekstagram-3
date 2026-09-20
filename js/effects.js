// Объект с конфигурацией для каждого эффекта
const EFFECTS_CONFIG = {
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
const imgUploadPreview = document.querySelector('.img-upload__preview img');
//  список эффектов, которые можно применить к изображению
const effectsList = document.querySelector('.effects__list');
// контейнер слайдера, который будет скрываться при выборе эффекта "Оригинал"
const sliderContainer = document.querySelector('.img-upload__effect-level');

let selectedEffect = 'none';
// Создаём слайдер с помощью noUiSlider
noUiSlider.create(sliderElement, {
  range: EFFECTS_CONFIG.none.range,
  start: EFFECTS_CONFIG.none.start,
  step: EFFECTS_CONFIG.none.step,
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
  const config = EFFECTS_CONFIG[selectedEffect];
  const sliderValue = Number(sliderElement.noUiSlider.get());
  if (selectedEffect === 'none') {
    sliderContainer.classList.add('hidden');
    imgUploadPreview.style.filter = '';
    sliderLevelElement.value = '';
  } else {
    sliderContainer.classList.remove('hidden');
    sliderLevelElement.value = sliderValue;
    // Собираем строку фильтра динамически из названия и единицы измерения
    imgUploadPreview.style.filter = `${config.filter}(${sliderValue}${config.unit})`;
  }
});

// Обработчик переключения радиокнопок
effectsList.addEventListener('change', (evt) => {
  selectedEffect = evt.target.value;
  const config = EFFECTS_CONFIG[selectedEffect];
  if (!config) {
    return;
  }
  sliderElement.noUiSlider.updateOptions({
    range: config.range,
    start: config.start,
    step: config.step,
  });
});

// Функция для сброса эффектов при закрытии формы
const resetEffects = () => {
  selectedEffect = 'none';
  sliderElement.noUiSlider.updateOptions({
    range: EFFECTS_CONFIG.none.range,
    start: EFFECTS_CONFIG.none.start,
    step: EFFECTS_CONFIG.none.step,
  });
};
export {resetEffects};
