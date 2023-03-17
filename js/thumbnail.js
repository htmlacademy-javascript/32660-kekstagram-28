import {openBigPictureModal} from './picture-modal.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureElements = pictureContainer.querySelectorAll('.picture');


const createPictureElement = ({ id, url, description, comments, likes }) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.dataset.id = id;

  pictureItem.addEventListener('click', () => openBigPictureModal(url, likes, comments, description));

  return pictureItem;
};

const renderPictures = (pictures) => {
  pictureElements.forEach((picture) => picture.remove());
  pictureContainer.append(...pictures.map(createPictureElement));
};

export { renderPictures };
