// шаг изменения масштаба
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

// Кнопки увеличения и уменьшения масштаба
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
// Поле, в котором отображается текущий масштаб
const scaleControlValueElement = document.querySelector('.scale__control--value');
// Изображение, к которому применяется масштаб
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const applyScale = (scale) => {
  imgUploadPreviewElement.style.transform = `scale(${scale / MAX_SCALE})`;
  scaleControlValueElement.value = `${scale}%`;
};

scaleControlSmallerElement.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValueElement.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    applyScale(currentScale);
  }
});

scaleControlBiggerElement.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValueElement.value, 10);
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
