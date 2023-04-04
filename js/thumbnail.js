import {openBigPictureModal} from './picture-modal.js';
import {getFilteredPictures, setOnFilterClick} from './filter.js';
import {debounce} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = ({ id, url, description, comments, likes }) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  const pictureImg = pictureItem.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.dataset.id = id;

  pictureItem.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPictureModal(url, likes, comments, description);
  });

  return pictureItem;
};

const renderPictures = (pictures) => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((picture) => picture.remove());

  const filteredPictures = getFilteredPictures(pictures);
  pictureContainer.append(...filteredPictures.map(createPictureElement));
};

const showThumbnails = (pictures) => {
  renderPictures(pictures);
  setOnFilterClick(debounce(() => renderPictures(pictures)));
};

export { showThumbnails };
