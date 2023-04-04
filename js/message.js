import {isEscapeKey} from './util.js';
import {onFormKeydown} from './form.js';

const SUCCESS = 'success';
const ERROR = 'error';

const createMessage = (element) => {
  const messageTemplate = document.querySelector(`#${element}`).content.querySelector(`.${element}`);
  const messageElement = messageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeEnd', messageElement);
  messageElement.classList.add('hidden');
};

const closeSuccessMessage = () => {
  document.querySelector('.success').classList.add('hidden');

  document.removeEventListener('click', onDocumentSuccessClick);
  document.removeEventListener('keydown', onDocumentSuccessKeydown);
};

const closeErrorMessage = () => {
  document.querySelector('.error').classList.add('hidden');

  document.addEventListener('keydown', onFormKeydown);
  document.removeEventListener('click', onDocumentErorrClick);
  document.removeEventListener('keydown', onDocumentErorrKeydown);
};

const showSuccessMessage = () => {
  if(!document.querySelector('.success')) {
    createMessage(SUCCESS);
  }
  document.querySelector('.success').classList.remove('hidden');

  document.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.addEventListener('click', onDocumentSuccessClick);
  document.addEventListener('keydown', onDocumentSuccessKeydown);
};

const showErrorMessage = () => {
  if(!document.querySelector('.error')) {
    createMessage(ERROR);
  }
  document.querySelector('.error').classList.remove('hidden');

  document.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('click', onDocumentErorrClick);
  document.addEventListener('keydown', onDocumentErorrKeydown);
  document.removeEventListener('keydown', onFormKeydown);
};

function onDocumentSuccessClick(evt) {
  if(!evt.target.matches('.success__inner')) {
    closeSuccessMessage();
  }
}

function onDocumentErorrClick(evt) {
  if(!evt.target.matches('.error__inner')) {
    closeErrorMessage();
  }
}

function onDocumentSuccessKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

function onDocumentErorrKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

export {showSuccessMessage, showErrorMessage};
