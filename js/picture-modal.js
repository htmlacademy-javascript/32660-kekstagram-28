import {isEscapeKey} from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const pictureBox = bigPictureModal.querySelector('.big-picture__preview');
const pictureElement = pictureBox.querySelector('img');
const likeCount = pictureBox.querySelector('.likes-count');
const pictureCaption = pictureBox.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsContainer = pictureBox.querySelector('.social__comments');
const commentCount = pictureBox.querySelector('.social__comment-count');
const commentsLoader = pictureBox.querySelector('.comments-loader');
const bigPictureModalCloseElement = document.querySelector('.big-picture__cancel');


const createCommentElement = ({avatar, message, name}) => {
  const commentItem = commentTemplate.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = name;
  commentItem.querySelector('.social__text').textContent = message;
  return commentItem;
};

const renderComments = (item) => {
  commentsContainer.innerHTML = '';
  commentsContainer.append(...item.map(createCommentElement));
};

const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');

  bigPictureModalCloseElement.removeEventListener('click', closePictureModal);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPictureModal = (url, likes, comments, description) => {
  pictureElement.src = url;
  pictureElement.alt = description;
  likeCount.textContent = likes;
  pictureCaption.textContent = description;

  renderComments(comments);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureModalCloseElement.addEventListener('click', closePictureModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

export {openBigPictureModal};
