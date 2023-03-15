import {isEscapeKey} from './util.js';
import {photos} from './main.js';

const bigPictureModal = document.querySelector('.big-picture');
const pictureBox = bigPictureModal.querySelector('.big-picture__preview');
const pictureElement = pictureBox.querySelector('img');
const likeCount = pictureBox.querySelector('.likes-count');
const pictureCaption = pictureBox.querySelector('.social__caption');
const commentsCount = pictureBox.querySelector('.comments-count');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsContainer = pictureBox.querySelector('.social__comments');
const commentCount = pictureBox.querySelector('.social__comment-count');
const commentsLoader = pictureBox.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

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

const renderPictureModal = (element) => {
  const parent = element.target.closest('.picture');

  pictureElement.src = element.target.src;
  pictureElement.alt = element.target.alt;
  likeCount.textContent = parent.querySelector('.picture__likes').textContent;
  commentsCount.textContent = parent.querySelector('.picture__comments').textContent;
  pictureCaption.textContent = element.target.alt;
};

const openPictureModal = (evt) => {
  evt.preventDefault();

  if (evt.target.closest('.picture')) {
    bigPictureModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    renderPictureModal(evt);
    const target = evt.target.closest('.picture');
    const currentDescription = photos.find((item) => item.id === Number(target.dataset.id));
    renderComments(currentDescription.comments);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const closePictureModal = () => {
  document.body.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

export {openPictureModal, closePictureModal};
