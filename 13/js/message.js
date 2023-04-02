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
};

const closeErrorMessage = () => {
  document.querySelector('.error').classList.add('hidden');
  document.addEventListener('keydown', onFormKeydown);
};

const showSuccessMessage = () => {
  if(!document.querySelector('.success')) {
    createMessage(SUCCESS);
  }
  document.querySelector('.success').classList.remove('hidden');

  document.querySelector('.success__button').addEventListener('click', closeSuccessMessage);

  document.addEventListener('click', (evt) => {
    if(!evt.target.matches('.success__inner')) {
      closeSuccessMessage();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
    }
  });
};


const showErrorMessage = () => {
  if(!document.querySelector('.error')) {
    createMessage(ERROR);
  }
  document.querySelector('.error').classList.remove('hidden');

  document.querySelector('.error__button').addEventListener('click', closeErrorMessage);

  document.addEventListener('click', (evt) => {
    if(!evt.target.matches('.error__inner')) {
      closeErrorMessage();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
    }
  });

  document.removeEventListener('keydown', onFormKeydown);
};

export {showSuccessMessage, showErrorMessage};
