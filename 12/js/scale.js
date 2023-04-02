const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleFildValue = document.querySelector('.scale__control--value');
const scalePreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scalePreview.style.transform = `scale(${value / 100})`;
  scaleFildValue.value = `${value}%`;
};

const resetScale = () => scaleImage(MAX_SCALE_VALUE);

const onBiggerButtonClick = () => {
  let scaleFildValueNumber = parseInt(scaleFildValue.value, 10);
  scaleFildValueNumber += STEP_SCALE_VALUE;
  scaleImage(scaleFildValueNumber);

  if(scaleFildValueNumber > MAX_SCALE_VALUE) {
    scaleImage(MAX_SCALE_VALUE);
  }
};

const onSmallerButtonClick = () => {
  let scaleFildValueNumber = parseInt(scaleFildValue.value, 10);
  scaleFildValueNumber -= STEP_SCALE_VALUE;
  scaleImage(scaleFildValueNumber);

  if(scaleFildValueNumber < STEP_SCALE_VALUE) {
    scaleImage(STEP_SCALE_VALUE);
  }
};

scaleBiggerButton.addEventListener('click', onBiggerButtonClick);
scaleSmallerButton.addEventListener('click', onSmallerButtonClick);

export {resetScale};
