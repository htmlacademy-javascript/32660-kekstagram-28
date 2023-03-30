import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';

const MESSAGE_LENGTH = 140;
const MESSAGE_ERROR_TEXT = `Максимальная длина ${MESSAGE_LENGTH} символов`;
const HASHTAG_MAX_COUNT = 5;
const TAG_ERROR_TEXT = 'Неправильно введены хештеги';
const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const uploadFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const formUploadPicture = document.querySelector('.img-upload__overlay');
const closeFormButton = formUploadPicture.querySelector('#upload-cancel');
const hashtagsField = formUploadPicture.querySelector('.text__hashtags');
const descriptionField = formUploadPicture.querySelector('.text__description');
const formSubmitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => HASHTAG_RULES.test(tag);

const validateMessage = (value) => value.length <= MESSAGE_LENGTH;

const hasValidateCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (tags) => tags.length === new Set(tags).size;

const validateTags = (value) => {
  const tags = value.toLowerCase().trim().split(/\s+/).filter((tag) => tag.trim());
  return hasValidateCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const openFormUploadImage = () => {
  formUploadPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFormKeydown);
};

const closeFormUploadImage = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();

  document.body.classList.remove('modal-open');
  formUploadPicture.classList.add('hidden');

  document.removeEventListener('keydown', onFormKeydown);
};

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

function onFormKeydown (evt) {
  if(document.activeElement === descriptionField || document.activeElement === hashtagsField) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormUploadImage();
  }
}

const setUserFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      blockSubmitButton();
      await cb(new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

pristine.addValidator(descriptionField, validateMessage, MESSAGE_ERROR_TEXT);
pristine.addValidator(hashtagsField, validateTags, TAG_ERROR_TEXT);

uploadFile.addEventListener('change', openFormUploadImage);
closeFormButton.addEventListener('click', closeFormUploadImage);

export {setUserFormSubmit, closeFormUploadImage, onFormKeydown};
