// шаг изменения масштаба
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

// Кнопки увеличения и уменьшения масштаба
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
// Поле, в котором отображается текущий масштаб
const scaleControlValue = document.querySelector('.scale__control--value');
// Изображение, к которому применяется масштаб
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const applyScale = (scale) => {
  scaleControlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    applyScale(currentScale);
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    applyScale(currentScale);
  }
});

// Сброс масштаба при закрытии формы
const resetScale = () => {
  applyScale(MAX_SCALE);
};

export {resetScale};
