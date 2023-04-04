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
const DEFAULT_EFFECT = EFFECTS[0];

const previewImage = document.querySelector('.img-upload__preview img');
const effectsListElements = document.querySelector('.effects');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderElement = effectSlider.querySelector('.effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');

let effectChecked = DEFAULT_EFFECT;

const isDefault = () => effectChecked === DEFAULT_EFFECT;

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
  effectChecked = DEFAULT_EFFECT;
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
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.start,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

hideSlider();

const onSliderUpdate = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();
  if(isDefault()) {
    previewImage.style.filter = DEFAULT_EFFECT.style;
  } else {
    previewImage.style.filter = `${effectChecked.style}(${sliderValue}${effectChecked.unit})`;
  }
  effectsValue.value = sliderValue;
};

effectsListElements.addEventListener('change', onEffectsChange);
effectSliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
