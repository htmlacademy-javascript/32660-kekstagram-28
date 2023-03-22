import {isEscapeKey} from './util.js';

const MESSAGE_LENGTH = 140;
const MESSAGE_ERROR_TEXT = `Максимальная длина ${MESSAGE_LENGTH} символов`;
const HASHTAG_MAX_COUNT = 5;
const TAG_ERROR_TEXT = 'Неправильно введены хештеги';
const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const formUploadPicture = document.querySelector('.img-upload__overlay');
const closeFormButton = formUploadPicture.querySelector('#upload-cancel');
const hashtagsField = formUploadPicture.querySelector('.text__hashtags');
const descriptionField = formUploadPicture.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => HASHTAG_RULES.test(tag);

const validateMessage = (value) => value.length <= MESSAGE_LENGTH;

const hasValidateCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (tags) => {
  const tagsToLowerCase = tags.map((item) => item.toLowerCase());
  return tagsToLowerCase.length === new Set(tagsToLowerCase).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidateCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(descriptionField, validateMessage, MESSAGE_ERROR_TEXT);
pristine.addValidator(hashtagsField, validateTags, TAG_ERROR_TEXT);

const openFormUploadImage = () => {
  formUploadPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFormKeydown);
};

const closeFormUploadImage = () => {
  form.reset();
  pristine.reset();

  document.body.classList.remove('modal-open');
  formUploadPicture.classList.add('hidden');

  document.removeEventListener('keydown', onFormKeydown);
};

function onFormKeydown (evt) {
  if(document.activeElement === descriptionField || document.activeElement === hashtagsField) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormUploadImage();
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    form.submit();
  }
};

uploadFile.addEventListener('change', openFormUploadImage);
closeFormButton.addEventListener('click', closeFormUploadImage);
form.addEventListener('submit', onFormSubmit);
