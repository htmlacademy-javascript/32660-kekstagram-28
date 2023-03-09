import {createPhotos} from './data.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = createPhotos();

const pictureListFragment = document.createDocumentFragment();

pictures.forEach(({url, description, comments, likes}) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureListFragment.appendChild(pictureItem);
});

pictureContainer.appendChild(pictureListFragment);
