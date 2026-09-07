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

scaleControlSmaller.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
  }
});

// Сброс масштаба при закрытии формы
const resetScale = () => {
  scaleControlValue.value = '100%';
  imgUploadPreview.style.transform = `scale(${MAX_SCALE / 100})`;
};

export {resetScale};
