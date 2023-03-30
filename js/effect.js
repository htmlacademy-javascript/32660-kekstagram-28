const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
];

const previewImage = document.querySelector('.img-upload__preview img');
const effectsListElements = document.querySelector('.effects');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderElement = effectSlider.querySelector('.effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');

const defaultEffect = EFFECTS[0];
let effectChecked = defaultEffect;

const isDefault = () => effectChecked === defaultEffect;

const showSlider = () => {
  effectSlider.classList.remove('hidden');
};

const hideSlider = () => {
  effectSlider.classList.add('hidden');
};

const updateEffects = () => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: effectChecked.min,
      max: effectChecked.max,
    },
    start: effectChecked.start,
    step: effectChecked.step,
  });

  (isDefault() ? hideSlider : showSlider)();
};

const resetEffects = () => {
  effectChecked = defaultEffect;
  previewImage.className = (`effects__preview--${effectChecked.name}`);
  updateEffects();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  effectChecked = EFFECTS.find((effect) => effect.name === evt.target.value);
  previewImage.className = (`effects__preview--${effectChecked.name}`);
  updateEffects();
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.start,
  step: defaultEffect.step,
  connect: 'lower',
});

hideSlider();

const onSliderUpdate = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();
  if(isDefault()) {
    previewImage.style.filter = defaultEffect.style;
  } else {
    previewImage.style.filter = `${effectChecked.style}(${sliderValue}${effectChecked.unit})`;
  }
  effectsValue.value = sliderValue;
};

effectsListElements.addEventListener('change', onEffectsChange);
effectSliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
