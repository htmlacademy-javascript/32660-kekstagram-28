const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = ({ url, description, comments, likes }) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;

  return pictureItem;
};

const renderPictures = (pictures) => {
  pictureContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  pictureContainer.append(...pictures.map(createPictureElement));
};

export { renderPictures };
